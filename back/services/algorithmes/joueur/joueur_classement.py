from back.services.algorithmes.tournois import tournois_recherche


def calculer_classement_general():
    classement_general = []
    tournois = tournois_recherche.tout_les_tournois()

    for tournoi in tournois:
        nom_tournoi = tournoi.get('nomTournoi', 'N/A')
        date_ouverture = tournoi.get('dateOuverture', 'N/A')
        date_fermeture = tournoi.get('dateFermeture', 'N/A')

        # Récupérer le vainqueur et le score du dernier match du tournoi
        dernier_match = tournoi.get('matchs', [])[-1] if tournoi.get('matchs') else {}
        vainqueur = dernier_match.get('vainqueur', 'N/A')
        score = dernier_match.get('score', {})

        # Vérifier si c'est un match nul ou non
        if vainqueur == 'match_nul':
            vainqueur = 'Match nul'
            score_text = 'Match nul'
        else:
            vainqueur_nom = vainqueur.split(' et ')[0] if 'et' in vainqueur else vainqueur
            score_text = f"{score['adversaire1']} - {score['adversaire2']}"

        # Déterminer la nature du tournoi
        nature = tournoi.get('nature', 'N/A')

        classement_general.append({
            "Nom du tournoi": nom_tournoi,
            "Date d'ouverture": date_ouverture,
            "Date de fermeture": date_fermeture,
            "Vainqueur": vainqueur_nom,
            "Score": score_text,
            "Nature": nature
        })

    return classement_general


def afficher_classement(classement):
    classement_json = []
    for i, (nom, victoires) in enumerate(classement.items(), start=1):
        classement_json.append({"Top": i, "Nom": nom, "Victoires": victoires})
    return classement_json
