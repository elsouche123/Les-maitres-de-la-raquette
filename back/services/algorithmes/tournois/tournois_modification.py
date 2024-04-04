from bson import ObjectId
from back.services.connexion.DatabaseService import DatabaseService


def modifier_tournois(id_tournoi: str, document: int):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    filtre = {"_id": ObjectId(id_tournoi)}
    mise_a_jour = {"$set": document}
    collection.update_one(filtre, mise_a_jour)
    db.seDeconnecter()

def modifier_match_tournois(id_tournoi: str, nouveaux_matchs: list):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    filtre = {"_id": id_tournoi}
    mise_a_jour = {"$set": {"matchs": nouveaux_matchs}}
    collection.update_one(filtre, mise_a_jour)
    db.seDeconnecter()
