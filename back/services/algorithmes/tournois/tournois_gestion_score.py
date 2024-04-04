

def inserer_vainqueur(matches):
    for match in matches:
        score_adversaire1 = match["match"]["score"]["adversaire1"]
        score_adversaire2 = match["match"]["score"]["adversaire2"]

        if score_adversaire1 > score_adversaire2:
            match["match"]["vainqueur"] = "adversaire1"
        elif score_adversaire1 < score_adversaire2:
            match["match"]["vainqueur"] = "adversaire2"
        else:
            match["match"]["vainqueur"] = "match_nul"

def initialiser_scores(matches):
    for match in matches:
        match["match"]["score"] = {
            "adversaire1": 0,
            "adversaire2": 0
        }

def initialiser_scores_et_inserer(id_tournoi, matches):
    for match in matches:
        match["match"]["score"] = {
            "adversaire1": 0,
            "adversaire2": 0
        }
