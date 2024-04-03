from back.services.connexion.DatabaseService import DatabaseService

def joueur_deja_inscrit(numero_inscription):
    db = DatabaseService()
    collection = db.get_collection("tournois")

    tournois = collection.find({"Statut": True})

    for tournoi in tournois:
        joueurs_actuels = tournoi.get("Joueurs", [])

        for joueur in joueurs_actuels:
            if joueur["NumeroInscription"] == numero_inscription:
                return True

    return False

def joueur_existe(numero_inscription, nom, prenom):
    db = DatabaseService()
    collection = db.get_collection("joueur")

    joueur = collection.find_one({
        "NumeroInscription": numero_inscription,
        "Nom": nom,
        "Prenom": prenom
    })

    return joueur is not None
