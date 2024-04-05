from back.services.algorithmes.tournois import tournois_modification
from back.services.connexion.DatabaseService import DatabaseService
def inserer_vainqueur_tournois(id_tournoi):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    tournoi = collection.find_one({"_id": id_tournoi})

    if tournoi:
        matches = tournoi.get("matchs", [])
        for match in matches:
            score_adversaire1 = match["match"]["score"]["adversaire1"]
            score_adversaire2 = match["match"]["score"]["adversaire2"]

            if score_adversaire1 > score_adversaire2:
                vainqueur = "adversaire1"
            elif score_adversaire1 < score_adversaire2:
                vainqueur = "adversaire2"
            else:
                vainqueur = "match_nul"

            filtre = {"_id": id_tournoi, "matchs.match": match["match"]}
            mise_a_jour = {"$set": {"matchs.$.vainqueur": vainqueur}}
            collection.update_one(filtre, mise_a_jour)
    db.seDeconnecter()



def initialiser_scores(id_tournoi, matches):
    for match in matches:
        match["match"]["score"] = {
            "adversaire1": 0,
            "adversaire2": 0
        }
    tournois_modification.modifier_score_tournois(id_tournoi, matches)

