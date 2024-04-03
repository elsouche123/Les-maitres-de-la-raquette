import datetime

from back.services.connexion.DatabaseService import DatabaseService


def insertion_tournoi(document: str):
    db = DatabaseService()
    collection = db.get_collection("tournois")
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

