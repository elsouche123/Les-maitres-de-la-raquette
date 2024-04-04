from back.services.connexion.DatabaseService import DatabaseService


def joueur_deja_inscrit(numero_inscription):
    db = DatabaseService()
    collection = db.get_collection("tournois")

    tournois = collection.find({"statut": True})

    for tournoi in tournois:
        joueurs_actuels = tournoi.get("Joueurs", [])

        for joueur in joueurs_actuels:
            if joueur["numeroInscription"] == numero_inscription:
                return True

    return False


def joueur_existe(numero_inscription, nom, prenom):
    db = DatabaseService()
    collection = db.get_collection("joueur")

    joueur = collection.find_one({
        "numeroInscription": numero_inscription,
        "nom": nom,
        "prenom": prenom
    })

    return joueur is not None
