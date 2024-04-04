import datetime

from back.services.connexion.DatabaseService import DatabaseService
from back.services.algorithmes.joueur.joueur_verif import joueur_deja_inscrit, joueur_existe
from back.services.algorithmes.joueur import joueur_match


def insertion_tournoi(document: str):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    collection.insert_one(document)
    db.seDeconnecter()

def insertion_joueur_tournoi(id_tournoi, numero_inscription, nom, prenom):
    result_messages = []

    if not joueur_existe(numero_inscription, nom, prenom):
        result_messages.append("Le joueur n'existe pas dans la base de données des joueurs.")
        return result_messages

    if joueur_deja_inscrit(numero_inscription):
        result_messages.append("Le joueur est déjà inscrit à un tournoi.")
        return result_messages

    db = DatabaseService()
    collection = db.get_collection("tournois")

    joueur = {"numeroInscription": numero_inscription, "nom": nom, "prenom": prenom}

    tournoi = collection.find_one({"_id": id_tournoi})

    if not tournoi:
        result_messages.append("Tournoi non trouvé.")
        return result_messages

    joueurs_actuels = tournoi.get("joueurs", [])
    place_disponible = tournoi.get("placeDisponible", 0)

    if place_disponible <= 0:
        result_messages.append("Le tournoi est complet. Aucun joueur ne peut être ajouté.")
        joueur_match.gestion_matchs()
        return result_messages

    joueurs_actuels.append(joueur)
    place_disponible -= 1

    collection.update_one(
        {"_id": id_tournoi},
        {"$set": {"joueurs": joueurs_actuels, "placeDisponible": place_disponible}}
    )

    if place_disponible == 0:
        collection.update_one(
            {"_id": id_tournoi},
            {"$set": {"statut": False}}
        )
        result_messages.append("Nombre de participants atteint. Le tournoi est maintenant fermé.")

    else:
        result_messages.append("Le joueur a été ajouté avec succès au tournoi.")

    return result_messages


