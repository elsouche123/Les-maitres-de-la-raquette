from back.services.algorithmes.tournois import tournois_modification
from back.services.algorithmes.tournois import tournois_recherche
from back.services.algorithmes.tournois import tournois_insertion
from back.services.algorithmes.joueur.joueur_classement import classement_joueurs, afficher_classement_joueurs

def afficher_matchs_tournoi(tournoi):
    matchs = tournoi.get('Matchs', [])
    if not matchs:
        print("Aucun match trouvé pour ce tournoi.")
        return

    print("Voici les matchs du tournoi :")
    for match in matchs:
        joueurs = match.get('joueurs', [])

        if joueurs:
            joueur1 = joueurs[0]['Nom'] + ' ' + joueurs[0]['Prenom']
            joueur2 = joueurs[1]['Nom'] + ' ' + joueurs[1]['Prenom']
            print(f"Match : {joueur1} contre {joueur2}")
            print()

def creer_matchs(joueurs):
    matchs = []

    if len(joueurs) < 2:
        print("Il n'y a pas suffisamment de joueurs pour créer un match.")
        return matchs

    for i in range(len(joueurs)):
        for j in range(i + 1, len(joueurs)):
            joueur1 = {"Nom": joueurs[i]['Nom'], "Prenom": joueurs[i]['Prenom']}
            joueur2 = {"Nom": joueurs[j]['Nom'], "Prenom": joueurs[j]['Prenom']}
            match = {
                "joueurs": [  # Format "j1 VS j2"
                    joueur1,  # Pas de score initialisé
                    joueur2,  # Pas de score initialisé
                ]
            }
            matchs.append(match)
    return matchs

def saisir_scores(matchs):
    for index, match in enumerate(matchs, start=1):
        joueurs = match['joueurs']
        joueur1 = f"{joueurs[0]['Nom']} {joueurs[0]['Prenom']}"
        joueur2 = f"{joueurs[1]['Nom']} {joueurs[1]['Prenom']}"
        print(f"Match {index}: {joueur1} contre {joueur2}")
        score_joueur1 = input(f"Entrez le score pour {joueur1}: ")
        score_joueur2 = input(f"Entrez le score pour {joueur2}: ")
        match['joueurs'][0]['score'] = int(score_joueur1)
        match['joueurs'][1]['score'] = int(score_joueur2)
        print()
    return matchs


def gestion_matchs():
    tournois = tournois_recherche.tout_les_tournois()

    if tournois:
        for tournoi in tournois:
            if not tournoi['Statut']:
                id_tournoi = tournoi['_id']
                joueurs = tournoi.get("Joueurs", [])
                matchs = creer_matchs(joueurs)
                if matchs:
                    tournois_modification.modifier_match_tournois(id_tournoi, matchs)
                    #afficher_matchs_tournoi(tournoi)
                    saisir_scores(matchs)
                    joueurs_tries = classement_joueurs(matchs)
                    afficher_classement_joueurs(joueurs_tries)
                else:
                    print("Aucun match n'a été créé.")
    else:
        print("Tournoi non trouvé.")

