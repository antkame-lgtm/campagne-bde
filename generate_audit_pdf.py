import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

# Palette officielle & complémentaire
PRIMARY = colors.HexColor("#1E3A8A")       # Bleu Royal Navy
SECONDARY = colors.HexColor("#F59E0B")     # Ambre / Orange
ACCENT = colors.HexColor("#3B82F6")        # Bleu Ciel
TEXT_DARK = colors.HexColor("#1E293B")     # Ardoise foncée
TEXT_MUTED = colors.HexColor("#64748B")    # Gris intermédiaire
BG_LIGHT = colors.HexColor("#F8FAFC")      # Blanc / Gris perle
BORDER_COLOR = colors.HexColor("#E2E8F0")

GREEN_TEXT = colors.HexColor("#065F46")
GREEN_BG = colors.HexColor("#ECFDF5")
GREEN_BORDER = colors.HexColor("#A7F3D0")

RED_TEXT = colors.HexColor("#991B1B")
RED_BG = colors.HexColor("#FEF2F2")
RED_BORDER = colors.HexColor("#FECACA")

BLUE_TEXT = colors.HexColor("#1E40AF")
BLUE_BG = colors.HexColor("#EFF6FF")
BLUE_BORDER = colors.HexColor("#BFDBFE")

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(PRIMARY)
        
        # Header (Pages 2+)
        if self._pageNumber > 1:
            self.drawString(40, 818, "AUDIT & OPTIMISATION DU CAHIER DES CHARGES — SITE DE CAMPAGNE BDE")
            self.setFont("Helvetica", 8)
            self.setFillColor(TEXT_MUTED)
            self.drawRightString(555, 818, "Projet : Campus Uni & Connecté")
            self.setStrokeColor(BORDER_COLOR)
            self.setLineWidth(0.5)
            self.line(40, 810, 555, 810)
            
        # Footer (Toutes les pages)
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.5)
        self.line(40, 42, 555, 42)
        self.setFont("Helvetica", 8)
        self.setFillColor(TEXT_MUTED)
        self.drawString(40, 30, "Document de cadrage d'ingénierie — Binôme de développement Antigravity")
        page_str = f"Page {self._pageNumber} sur {page_count}"
        self.drawRightString(555, 30, page_str)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=TEXT_MUTED,
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY,
        spaceBefore=10,
        spaceAfter=8
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=TEXT_DARK,
        spaceBefore=6,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_DARK
    )

    bold_body = ParagraphStyle(
        'BoldBody',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    card_title_green = ParagraphStyle(
        'CardTitleGreen',
        parent=bold_body,
        fontSize=9.5,
        leading=12,
        textColor=GREEN_TEXT
    )

    card_title_red = ParagraphStyle(
        'CardTitleRed',
        parent=bold_body,
        fontSize=9.5,
        leading=12,
        textColor=RED_TEXT
    )

    card_title_blue = ParagraphStyle(
        'CardTitleBlue',
        parent=bold_body,
        fontSize=9.5,
        leading=12,
        textColor=BLUE_TEXT
    )

    th_style = ParagraphStyle(
        'TableHeader',
        parent=bold_body,
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    story = []

    # =========================================================================
    # PAGE 1 : EN-TÊTE + CONTEXTE + PROS (FORCES)
    # =========================================================================
    story.append(Paragraph("AUDIT CRITIQUE & PLAN D'ACTION", title_style))
    story.append(Paragraph("<b>Plateforme Web Participative BDE :</b> Évaluation du Cahier des Charges & Solutions pour le Binôme", subtitle_style))
    
    # Cartouche Métadonnées
    meta_data = [
        [
            Paragraph("<b>Projet :</b> Campus Uni & Connecté", body_style),
            Paragraph("<b>Délai prévisionnel :</b> 9 jours", body_style),
            Paragraph("<b>Équipe :</b> 2 Développeurs", body_style),
            Paragraph("<b>Date :</b> Octobre 2026", body_style),
        ]
    ]
    t_meta = Table(meta_data, colWidths=[140, 115, 120, 140])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BG_LIGHT),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 10))

    # Note d'intention
    intro_p = Paragraph(
        "<b>Synthèse de l'évaluation :</b> Le cahier des charges initial propose une vision riche, moderne et engageante. "
        "Cependant, sa densité fonctionnelle (8 modules) rapportée au temps imparti (9 jours) et les contraintes réelles "
        "d'un scrutin étudiant (risques de fraude/trolling, friction mobile) nécessitent un ajustement pragmatique. "
        "Ce rapport formalise les atouts du document, ses zones de vulnérabilité et les solutions techniques validées.",
        body_style
    )
    story.append(intro_p)
    story.append(Spacer(1, 12))

    story.append(Paragraph("1. LES FORCES DU CAHIER DES CHARGES (PROS)", h1_style))
    
    pros = [
        ("Positionnement Stratégique & Électoral",
         "Le site ne se limite pas à une plaquette statique : il intègre la dimension participative (boîte à idées, upvotes, compte à rebours, jauge d'avancement) qui est le cœur de la mobilisation étudiante.",
         "Forte valeur ajoutée sur l'engagement"),
        ("Architecture Technique Moderne & Cohérente",
         "La recommandation Next.js (React) + Tailwind CSS + Supabase/Firebase sur Vercel est le standard de l'industrie : performant, scalable, et parfaitement adapté aux temps de chargement réduits (<1,5 s sur 4G).",
         "Stack moderne et réactive"),
        ("Exigences Mobile-First & RGPD Claires",
         "Prise en compte lucide des habitudes de navigation (+85 % de trafic mobile) avec menu burger tactile, images WebP et chiffrement SSL/HTTPS obligatoire pour les formulaires sensibles.",
         "Conformité et accessibilité ciblées"),
        ("Identité Visuelle Soignée & Codifiée",
         "La palette chromatique (Bleu Royal #1E3A8A, Ambre #F59E0B, Ciel #3B82F6) et la typographie Inter créent une image professionnelle qui équilibre crédibilité institutionnelle et énergie associative.",
         "Charte graphique prête à l'intégration")
    ]

    for title, desc, tag in pros:
        card = [
            [Paragraph(f"<b>✔ {title}</b> — <font color='#065F46'><i>{tag}</i></font>", card_title_green)],
            [Paragraph(desc, body_style)]
        ]
        t = Table(card, colWidths=[515])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), GREEN_BG),
            ('BOX', (0, 0), (-1, -1), 0.5, GREEN_BORDER),
            ('PADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 1), (-1, 1), 7),
        ]))
        story.append(t)
        story.append(Spacer(1, 6))

    # =========================================================================
    # PAGE 2 : CONS (FAIBLESSES ET RISQUES)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("2. LES FAIBLESSES ET RISQUES DU CAHIER DES CHARGES (CONS)", h1_style))
    
    cons = [
        ("Surcharge de Périmètre (Scope Creep) vs Deadline de 9 Jours",
         "<b>Constat :</b> Développer 8 modules complexes (tutorat complet, annales avec upload/téléchargement, agenda interactif, notifications, moteur de recherche, administration) à 2 développeurs en 9 jours crée un risque critique de livraison inachevée.<br/>"
         "<b>Impact :</b> Retard potentiel sur les fonctionnalités vitales de campagne le jour du scrutin.",
         "Risque Majeur : Délais"),
        ("Friction d'Inscription & Risque de Désertion Mobile",
         "<b>Constat :</b> Imposer un compte classique avec mot de passe pour déposer une idée ou upvoter fait chuter le taux de conversion de plus de 75 % sur smartphone.<br/>"
         "<b>Impact :</b> Faible taux de participation étudiante et boîte à idées délaissée.",
         "Risque d'Usage : Abandon"),
        ("Faille Critique de Modération ('A Posteriori')",
         "<b>Constat :</b> Le CDC autorise une modération a posteriori. En pleine tension électorale, un étudiant ou une liste concurrente pourrait poster des propos diffamatoires visibles publiquement avant toute intervention.<br/>"
         "<b>Impact :</b> Crise de réputation immédiate pour la candidate.",
         "Risque Sécurité : Sabotage"),
        ("Irréalisme Technique des 'Alertes WhatsApp Automatisées'",
         "<b>Constat :</b> L'API officielle WhatsApp Business nécessite un compte Meta Business vérifié avec KBIS, payant par message et requérant plusieurs jours de validation administrative.<br/>"
         "<b>Impact :</b> Blocage technique impossible à résoudre dans le délai imparti.",
         "Risque Technique : Faisabilité"),
        ("Absence d'Outils de Viralité Campus (Réseaux Sociaux)",
         "<b>Constat :</b> Le CDC propose un comité de soutien passif mais omet les leviers de propagation organique (stories Instagram personnalisées, badges partageables, micro-défis de soutien).<br/>"
         "<b>Impact :</b> Visibilité restreinte au seul bouche-à-oreille classique.",
         "Angle Mort Électoral : Visibilité")
    ]

    for title, desc, tag in cons:
        card = [
            [Paragraph(f"<b>⚠ {title}</b> — <font color='#991B1B'><i>{tag}</i></font>", card_title_red)],
            [Paragraph(desc, body_style)]
        ]
        t = Table(card, colWidths=[515])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), RED_BG),
            ('BOX', (0, 0), (-1, -1), 0.5, RED_BORDER),
            ('PADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 1), (-1, 1), 7),
        ]))
        story.append(t)
        story.append(Spacer(1, 5))

    # =========================================================================
    # PAGE 3 : SOLUTIONS & FEUILLE DE ROUTE OPÉRATIONNELLE
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("3. SOLUTIONS TECHNIQUES & PLAN D'ACTION OPÉRATIONNEL", h1_style))

    solutions = [
        ("Découpage Tactique : MVP Campagne (J0) vs Module Mandat (Post-Élection)",
         "<b>Solution :</b> Concentrer l'effort des 9 jours sur le <b>Sprint Élection</b> (Accueil, Programme & Promesses, Boîte à idées + Upvotes, FAQ & Ralliement). Remplacer le système lourd de tutorat/annales par un formulaire sécurisé d'urgence et un lien de partage Drive durant la campagne. Le module complet sera développé après la victoire.",
         "Garantie de livraison à J+9"),
        ("Authentification Zéro Friction (Magic Link / Code OTP à 4 chiffres)",
         "<b>Solution :</b> Supprimer tout mot de passe. L'étudiant saisit son adresse @ecole.fr, reçoit un code éphémère à 4 chiffres (Supabase Auth / Resend), et valide son vote en 5 secondes sur smartphone. La restriction '1 vote unique par idée' est garantie sans friction.",
         "Taux de conversion maximal"),
        ("Modération 'A Priori' Ultra-Rapide via Webhook Discord / Telegram",
         "<b>Solution :</b> Toute idée soumise arrive avec l'état 'en attente'. Un bot privé envoie instantanément une alerte au QG de campagne avec 2 boutons : [Valider] / [Rejeter]. Aucune publication douteuse n'apparaît en ligne sans l'aval d'un membre du bureau.",
         "Sécurité réputationnelle absolue"),
        ("Remplacement de l'API WhatsApp par un Canal / Communauté Directe",
         "<b>Solution :</b> Remplacer l'API payante par des boutons d'adhésion en 1 clic vers une <b>Communauté WhatsApp</b> ou un <b>Canal de Diffusion</b> officiel. Gratuit, instantané, sans code et utilisé par 100 % des étudiants.",
         "Coût zéro & Déploiement immédiat"),
        ("Générateur Viral de Story Instagram / TikTok 'Je Vote Pour...'",
         "<b>Solution :</b> Créer un canvas HTML5 dynamique où l'étudiant entre son prénom et télécharge en 1 clic son visuel format 9:16 aux couleurs du BDE pour le poster sur ses réseaux sociaux.",
         "Effet boule de neige garanti")
    ]

    for title, desc, tag in solutions:
        card = [
            [Paragraph(f"<b>★ {title}</b> — <font color='#1E40AF'><i>{tag}</i></font>", card_title_blue)],
            [Paragraph(desc, body_style)]
        ]
        t = Table(card, colWidths=[515])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), BLUE_BG),
            ('BOX', (0, 0), (-1, -1), 0.5, BLUE_BORDER),
            ('PADDING', (0, 0), (-1, -1), 5),
            ('BOTTOMPADDING', (0, 1), (-1, 1), 6),
        ]))
        story.append(t)
        story.append(Spacer(1, 5))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Matrice de Répartition Recommandée entre les 2 Développeurs :</b>", h2_style))

    matrix_data = [
        [
            Paragraph("<b>Sprint (Jours)</b>", th_style),
            Paragraph("<b>Développeur A (Lead UI & Engagement)</b>", th_style),
            Paragraph("<b>Développeur B (Lead Backend & Data)</b>", th_style)
        ],
        [
            Paragraph("<b>J+1 à J+3</b><br/>Conception & Socle", body_style),
            Paragraph("Structure Next.js + Tailwind, Navbar, Footer, Page Home (Hero, Vidéo, Compte à rebours).", body_style),
            Paragraph("Projet Supabase, Schéma SQL (tables ideas, votes, users, status), variables d'environnement.", body_style)
        ],
        [
            Paragraph("<b>J+4 à J+7</b><br/>Fonctionnalités", body_style),
            Paragraph("Pages Programme, Vision/Équipe, Agenda, et intégration du Générateur de Story Instagram.", body_style),
            Paragraph("Système d'auth OTP email étudiant, API d'upvote (1 vote/user), Webhook de modération.", body_style)
        ],
        [
            Paragraph("<b>J+8 à J+9</b><br/>Recette & Go Live", body_style),
            Paragraph("Optimisation mobile 4G, assets WebP, audit contrastes, liens WhatsApp & réseaux.", body_style),
            Paragraph("Sécurisation des clés API, tests d'injection/spam, déploiement Vercel & nom de domaine.", body_style)
        ]
    ]

    t_matrix = Table(matrix_data, colWidths=[85, 215, 215])
    t_matrix.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_COLOR),
        ('PADDING', (0, 0), (-1, -1), 4),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, BG_LIGHT])
    ]))

    story.append(t_matrix)

    # Compilation
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF généré avec succès : {filename}")

if __name__ == "__main__":
    out_file = r"C:\Users\HP\projects\campagne-bde\Audit_et_Solutions_Cahier_des_Charges_BDE.pdf"
    build_pdf(out_file)
