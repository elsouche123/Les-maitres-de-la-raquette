from back.services.connexion.DatabaseService import DatabaseService
from back.services.algorithmes.joueur.joueur_verif import joueur_deja_inscrit, joueur_existe


def insertion_tournoi(id: str, nom_tournoi: str, type: str, nature: str, place_disponible: int, statut: bool, date_ouverture: str, date_fermeture: str):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    document = {
        "_id": id,
        "nomTournoi": nom_tournoi,
        "type": type,
        "nature": nature,
        "placeDisponible": place_disponible,
        "statut": statut,
        "dateOuverture": date_ouverture,
        "dateFermeture": date_fermeture,
        "joueurs": [],
        "matchs": []
    }
    collection.insert_one(document)
    db.seDeconnecter()


def insertion_match(id_joueur1: str, id_joueur2: str, heure: str, categorie: str):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    document = {
        "match"[
        "joueurs": {
            "j1": id_joueur1,
            "j2": id_joueur2
        },
        "heure": heure,
        "categorie": categorie
        ]
    }
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

    joueur = {"NumeroInscription": numero_inscription, "Nom": nom, "Prenom": prenom}

    tournoi = collection.find_one({"_id": id_tournoi})

    if not tournoi:
        result_messages.append("Tournoi non trouvé.")
        return result_messages

    joueurs_actuels = tournoi.get("Joueurs", [])
    place_disponible = tournoi.get("PlaceDisponible", 0)

    if place_disponible <= 0:
        result_messages.append("Le tournoi est complet. Aucun joueur ne peut être ajouté.")
        return result_messages

    joueurs_actuels.append(joueur)
    place_disponible -= 1

    collection.update_one(
        {"_id": id_tournoi},
        {"$set": {"Joueurs": joueurs_actuels, "PlaceDisponible": place_disponible}}
    )

    if place_disponible == 0:
        collection.update_one(
            {"_id": id_tournoi},
            {"$set": {"Statut": False}}
        )
        result_messages.append("Nombre de participants atteint. Le tournoi est maintenant fermé.")
    else:
        result_messages.append("Le joueur a été ajouté avec succès au tournoi.")

    return result_messages


