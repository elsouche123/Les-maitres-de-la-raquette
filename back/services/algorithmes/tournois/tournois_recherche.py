from back.services.connexion.DatabaseService import DatabaseService


def rechercher_tournois_par_date(date: str):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    filtre = {"date": date}
    resultat = list(collection.find(filtre))
    db.seDeconnecter()
    return resultat


def rechercher_tournois_par_lieu(nom_lieu: str):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    filtre = {"lieu.nom": nom_lieu}
    resultat = list(collection.find(filtre))
    db.seDeconnecter()
    return resultat


def tournois_statut(statut):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    tournois = list(collection.find({"statut": statut}))
    return tournois


def tout_les_tournois():
    db = DatabaseService()
    collection = db.get_collection("tournois")
    projection = {"_id": 0}
    result = list(collection.find({}, projection))
    db.seDeconnecter()
    return result


def rechercher_tournois_par_numero(numero: str):
    db = DatabaseService()
    collection = db.get_collection("tournois")
    projection = {"_id": 0}
    filtre = {
        "joueurs.numeroInscription": numero
    }
    result = list(collection.find(filtre, projection))
    db.seDeconnecter()
    return result
