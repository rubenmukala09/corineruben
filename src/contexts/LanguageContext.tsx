import React, { createContext, useContext, useState } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Nav
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.story': { fr: 'Notre Histoire', en: 'Our Story' },
  'nav.details': { fr: 'Détails', en: 'Details' },
  'nav.rsvp': { fr: 'RSVP', en: 'RSVP' },
  'nav.gallery': { fr: 'Galerie', en: 'Gallery' },
  'nav.registry': { fr: 'Cadeaux', en: 'Gifts' },

  // Hero
  'hero.date': { fr: '15 Août 2027', en: 'August 15, 2027' },
  'hero.tagline': { fr: 'Nous nous marions !', en: 'We\'re getting married!' },
  'hero.cta': { fr: 'Confirmer votre présence', en: 'RSVP Now' },
  'hero.scroll': { fr: 'Découvrir plus', en: 'Discover more' },

  // Countdown
  'countdown.days': { fr: 'Jours', en: 'Days' },
  'countdown.hours': { fr: 'Heures', en: 'Hours' },
  'countdown.minutes': { fr: 'Minutes', en: 'Minutes' },
  'countdown.seconds': { fr: 'Secondes', en: 'Seconds' },

  // Index page
  'index.ourJourney': { fr: 'Notre Parcours', en: 'Our Journey' },
  'index.joinCelebration': { fr: 'Rejoignez la célébration', en: 'Join our celebration' },
  'index.celebrationDesc': { fr: 'Une célébration d\'amour, de famille et d\'union', en: 'A celebration of love, family & togetherness' },
  'index.guestsInvited': { fr: 'Invités', en: 'Guests Invited' },
  'index.courseDinner': { fr: 'Plats au Dîner', en: 'Course Dinner' },
  'index.love': { fr: 'Amour', en: 'Love' },
  'index.explore': { fr: 'Explorer', en: 'Explore' },
  'index.capturedMoments': { fr: 'Des moments précieux de notre histoire d\'amour', en: 'Captured moments of our love story' },

  // Story
  'story.title': { fr: 'Notre Histoire', en: 'Our Story' },
  'story.subtitle': { fr: 'Le chemin qui nous a menés l\'un vers l\'autre', en: 'The journey that led us to each other' },
  'story.event1.title': { fr: 'Première Rencontre', en: 'First Meeting' },
  'story.event1.description': { fr: 'Nos regards se sont croisés pour la première fois lors d\'une soirée entre amis. Ce fut le début d\'une belle aventure.', en: 'Our eyes met for the first time at a gathering with friends. It was the beginning of a beautiful adventure.' },
  'story.event1.date': { fr: 'Été 2020', en: 'Summer 2020' },
  'story.event2.title': { fr: 'Premier Rendez-vous', en: 'First Date' },
  'story.event2.description': { fr: 'Un dîner sous les étoiles, des rires partagés et la certitude que quelque chose de spécial commençait.', en: 'A dinner under the stars, shared laughter and the certainty that something special was beginning.' },
  'story.event2.date': { fr: 'Automne 2020', en: 'Fall 2020' },
  'story.event3.title': { fr: 'Voyage Ensemble', en: 'Traveling Together' },
  'story.event3.description': { fr: 'Notre premier voyage ensemble a scellé notre amour. Découvrir le monde main dans la main.', en: 'Our first trip together sealed our love. Discovering the world hand in hand.' },
  'story.event3.date': { fr: 'Printemps 2021', en: 'Spring 2021' },
  'story.event4.title': { fr: 'Emménagement', en: 'Moving In Together' },
  'story.event4.description': { fr: 'Nous avons décidé de construire notre nid douillet, un foyer rempli d\'amour et de tendresse.', en: 'We decided to build our cozy nest, a home filled with love and tenderness.' },
  'story.event4.date': { fr: 'Été 2022', en: 'Summer 2022' },
  'story.event5.title': { fr: 'La Demande', en: 'The Proposal' },
  'story.event5.description': { fr: 'Un genou à terre, un anneau, et un « oui » qui résonne encore dans nos cœurs.', en: 'One knee on the ground, a ring, and a "yes" that still echoes in our hearts.' },
  'story.event5.date': { fr: 'Décembre 2024', en: 'December 2024' },
  'story.continues': { fr: 'Notre aventure continue...', en: 'Our journey continues...' },

  // Details
  'details.title': { fr: 'Détails du Mariage', en: 'Wedding Details' },
  'details.subtitle': { fr: 'Tout ce que vous devez savoir pour cette journée spéciale', en: 'Everything you need to know for this special day' },
  'details.ceremony': { fr: 'Cérémonie', en: 'Ceremony' },
  'details.ceremony.time': { fr: '14h00', en: '2:00 PM' },
  'details.ceremony.location': { fr: 'Église Saint-Pierre', en: 'Saint-Pierre Church' },
  'details.ceremony.address': { fr: '12 Rue de la Paix, Paris', en: '12 Rue de la Paix, Paris' },
  'details.reception': { fr: 'Réception', en: 'Reception' },
  'details.reception.time': { fr: '18h00', en: '6:00 PM' },
  'details.reception.location': { fr: 'Château des Fleurs', en: 'Château des Fleurs' },
  'details.reception.address': { fr: '45 Avenue des Roses, Versailles', en: '45 Avenue des Roses, Versailles' },
  'details.accommodation': { fr: 'Hébergement', en: 'Accommodation' },
  'details.accommodation.desc': { fr: 'Nous avons réservé un bloc de chambres à l\'Hôtel Le Grand avec un tarif spécial pour nos invités.', en: 'We have reserved a block of rooms at Hotel Le Grand with a special rate for our guests.' },
  'details.accommodation.hotel': { fr: 'Hôtel Le Grand', en: 'Hotel Le Grand' },
  'details.accommodation.hotel.desc': { fr: 'Chambres confortables avec petit-déjeuner inclus pour nos invités.', en: 'Comfortable rooms with breakfast included for our guests.' },
  'details.accommodation.address': { fr: 'Adresse', en: 'Address' },
  'details.accommodation.address.desc': { fr: '25 Boulevard Royal, Versailles', en: '25 Boulevard Royal, Versailles' },
  'details.accommodation.rate': { fr: 'Tarif spécial', en: 'Special Rate' },
  'details.accommodation.rate.desc': { fr: 'Tarif réduit de 120€/nuit. Mentionnez « Mariage Corine & Ruben » lors de la réservation.', en: 'Reduced rate of €120/night. Mention "Corine & Ruben Wedding" when booking.' },
  'details.transport': { fr: 'Transport', en: 'Transportation' },
  'details.transport.desc': { fr: 'Une navette sera disponible entre l\'église et le lieu de réception. Parking gratuit sur place.', en: 'A shuttle will be available between the church and the reception venue. Free parking on site.' },
  'details.transport.shuttle': { fr: 'Navette', en: 'Shuttle Service' },
  'details.transport.shuttle.desc': { fr: 'Navette gratuite entre l\'église et le château. Départs toutes les 15 minutes.', en: 'Free shuttle between the church and château. Departures every 15 minutes.' },
  'details.transport.parking': { fr: 'Stationnement', en: 'Parking' },
  'details.transport.parking.desc': { fr: 'Parking gratuit disponible au Château des Fleurs. 200 places.', en: 'Free parking available at Château des Fleurs. 200 spots.' },
  'details.transport.schedule': { fr: 'Horaires navette', en: 'Shuttle Schedule' },
  'details.transport.schedule.desc': { fr: 'Première navette : 17h30 — Dernière navette retour : 2h00', en: 'First shuttle: 5:30 PM — Last return shuttle: 2:00 AM' },
  'details.tapToSee': { fr: 'Appuyez pour voir', en: 'Tap to view' },

  // Ceremony program
  'details.ceremony.program.welcome': { fr: 'Accueil des invités à partir de 13h30', en: 'Guest welcome from 1:30 PM' },
  'details.ceremony.program.readings': { fr: 'Lectures Bibliques', en: 'Scripture Readings' },
  'details.ceremony.program.readings.desc': { fr: '1 Corinthiens 13 et Genèse 2:24 — Lus par la famille', en: '1 Corinthians 13 and Genesis 2:24 — Read by family members' },
  'details.ceremony.program.vows': { fr: 'Échange des Vœux', en: 'Exchange of Vows' },
  'details.ceremony.program.vows.desc': { fr: 'Vœux personnels suivis de l\'échange des alliances', en: 'Personal vows followed by the exchange of rings' },
  'details.ceremony.program.hymns': { fr: 'Cantiques', en: 'Hymns' },
  'details.ceremony.program.hymns.desc': { fr: 'Amazing Grace, How Great Thou Art, et cantiques de louange', en: 'Amazing Grace, How Great Thou Art, and worship songs' },
  'details.ceremony.program.blessing': { fr: 'Bénédiction Finale', en: 'Final Blessing' },
  'details.ceremony.program.blessing.desc': { fr: 'Bénédiction pastorale et prière pour le couple', en: 'Pastoral blessing and prayer for the couple' },

  // Reception program
  'details.reception.program.cocktail': { fr: 'Cocktail et apéritifs dès 18h00', en: 'Cocktail hour and appetizers from 6:00 PM' },
  'details.reception.program.dinner': { fr: 'Dîner', en: 'Dinner' },
  'details.reception.program.dinner.desc': { fr: 'Dîner 5 plats servi à 19h30, suivi de discours et toasts', en: '5-course dinner served at 7:30 PM, followed by speeches and toasts' },
  'details.reception.program.dance': { fr: 'Soirée Dansante', en: 'Dancing' },
  'details.reception.program.dance.desc': { fr: 'Première danse à 21h30, suivi de la soirée dansante jusqu\'à 2h00', en: 'First dance at 9:30 PM, followed by dancing until 2:00 AM' },
  'details.reception.program.cake': { fr: 'Gâteau de Mariage', en: 'Wedding Cake' },
  'details.reception.program.cake.desc': { fr: 'Découpe du gâteau à 22h30 — Pièce montée traditionnelle', en: 'Cake cutting at 10:30 PM — Traditional croquembouche' },

  // RSVP
  'rsvp.title': { fr: 'Confirmer votre Présence', en: 'Confirm your Attendance' },
  'rsvp.subtitle': { fr: 'Nous avons hâte de célébrer avec vous', en: 'We can\'t wait to celebrate with you' },
  'rsvp.name': { fr: 'Votre nom complet', en: 'Your Full Name' },
  'rsvp.name.placeholder': { fr: 'Prénom et nom', en: 'First and last name' },
  'rsvp.email': { fr: 'Votre email', en: 'Your Email' },
  'rsvp.email.placeholder': { fr: 'email@exemple.com', en: 'email@example.com' },
  'rsvp.attending': { fr: 'Serez-vous présent(e) ?', en: 'Will you attend?' },
  'rsvp.yes': { fr: 'Avec joie !', en: 'Joyfully!' },
  'rsvp.no': { fr: 'Malheureusement non', en: 'Unfortunately no' },
  'rsvp.meal': { fr: 'Votre plat principal', en: 'Your Main Course' },
  'rsvp.meal.meat': { fr: 'Viande', en: 'Meat' },
  'rsvp.meal.fish': { fr: 'Poisson', en: 'Fish' },
  'rsvp.meal.veg': { fr: 'Végétarien', en: 'Vegetarian' },
  'rsvp.meal.vegan': { fr: 'Végan', en: 'Vegan' },
  'rsvp.meal.glutenfree': { fr: 'Sans Gluten', en: 'Gluten-Free' },
  'rsvp.meal.halal': { fr: 'Halal', en: 'Halal' },
  'rsvp.meal.kids': { fr: 'Menu Enfant', en: 'Kids Menu' },
  'rsvp.sides': { fr: 'Accompagnements', en: 'Side Dishes' },
  'rsvp.side.potatoes': { fr: 'Pommes de terre', en: 'Potatoes' },
  'rsvp.side.vegetables': { fr: 'Légumes grillés', en: 'Grilled Vegetables' },
  'rsvp.side.rice': { fr: 'Riz parfumé', en: 'Fragrant Rice' },
  'rsvp.side.salad': { fr: 'Salade verte', en: 'Green Salad' },
  'rsvp.side.quinoa': { fr: 'Quinoa', en: 'Quinoa' },
  'rsvp.side.pasta': { fr: 'Pâtes fraîches', en: 'Fresh Pasta' },
  'rsvp.side.couscous': { fr: 'Couscous', en: 'Couscous' },
  'rsvp.side.fries': { fr: 'Frites', en: 'Fries' },
  'rsvp.side.sweetpotato': { fr: 'Patate douce', en: 'Sweet Potato' },
  'rsvp.side.hummus': { fr: 'Houmous & crudités', en: 'Hummus & Veggies' },
  'rsvp.dietary': { fr: 'Restrictions alimentaires', en: 'Dietary Restrictions' },
  'rsvp.dietary.placeholder': { fr: 'Allergies, régime spécial...', en: 'Allergies, special diet...' },
  'rsvp.table.anonymous': { fr: 'Rester anonyme', en: 'Stay anonymous' },
  'rsvp.table.anonymous.hint': { fr: 'Votre nom sera affiché comme « Anonyme »', en: 'Your name will appear as "Anonymous"' },
  'rsvp.table.seats.available': { fr: 'places disponibles', en: 'seats available' },
  'rsvp.table.full': { fr: 'Complet', en: 'Full' },
  'rsvp.table.leave': { fr: 'Quitter', en: 'Leave' },
  'rsvp.table.join': { fr: 'Rejoindre', en: 'Join' },
  'rsvp.plusone': { fr: 'Accompagnant(e)', en: 'Plus One' },
  'rsvp.plusone.name': { fr: 'Nom de l\'accompagnant(e)', en: 'Plus one\'s name' },
  'rsvp.companions': { fr: 'Accompagnants', en: 'Companions' },
  'rsvp.companions.hint': { fr: 'Ajoutez les noms des personnes qui vous accompagnent', en: 'Add the names of people coming with you' },
  'rsvp.companions.placeholder': { fr: 'Nom complet de l\'accompagnant', en: 'Companion\'s full name' },
  'rsvp.companions.add': { fr: 'Ajouter', en: 'Add' },
  'rsvp.companions.count': { fr: '{count} personnes au total (vous inclus)', en: '{count} people total (including you)' },
  'rsvp.submit': { fr: 'Confirmer', en: 'Confirm' },
  'rsvp.next': { fr: 'Suivant', en: 'Next' },
  'rsvp.back': { fr: 'Retour', en: 'Back' },
  'rsvp.step.info': { fr: 'Vos informations', en: 'Your Information' },
  'rsvp.step.info.hint': { fr: 'Quelques détails pour vous identifier', en: 'A few details to identify you' },
  'rsvp.step.meal': { fr: 'Composez votre repas', en: 'Design Your Meal' },
  'rsvp.step.meal.hint': { fr: 'Choisissez votre plat et accompagnements', en: 'Pick your main course and sides' },
  'rsvp.step.table': { fr: 'Choisissez votre table', en: 'Choose Your Table' },
  'rsvp.step.table.hint': { fr: 'Rejoignez vos amis ou créez une table famille', en: 'Join your friends or create a family table' },
  'rsvp.step.gift': { fr: 'Un cadeau ?', en: 'A Gift?' },
  'rsvp.step.gift.hint': { fr: 'Optionnel — votre présence est déjà un cadeau', en: 'Optional — your presence is already a gift' },
  'rsvp.gift.message': { fr: 'Votre présence est notre plus beau cadeau. Si vous souhaitez contribuer, scannez le QR code ou copiez le lien de paiement.', en: 'Your presence is our greatest gift. If you wish to contribute, scan the QR code or copy the payment link.' },
  'rsvp.gift.scanQR': { fr: 'Scannez ce code pour envoyer votre cadeau', en: 'Scan this code to send your gift' },
  'rsvp.gift.copyLink': { fr: 'Copier le lien', en: 'Copy payment link' },
  'rsvp.gift.copied': { fr: 'Lien copié !', en: 'Link copied!' },
  'rsvp.gift.generateQR': { fr: 'QR Code', en: 'QR Code' },
  'rsvp.gift.skip': { fr: 'Passer & confirmer', en: 'Skip & confirm' },
  'rsvp.gift.changeAmount': { fr: 'Changer le montant', en: 'Change amount' },
  'rsvp.gift.noteLabel': { fr: 'Un petit mot (optionnel)', en: 'A short note (optional)' },
  'rsvp.done.meal': { fr: 'Votre repas', en: 'Your Meal' },
  'rsvp.done.gift': { fr: 'Votre cadeau', en: 'Your Gift' },
  'rsvp.done.confirmation': { fr: 'Un email de confirmation vous sera envoyé prochainement.', en: 'A confirmation email will be sent to you shortly.' },
  'rsvp.table.label': { fr: 'Table', en: 'Table' },
  'rsvp.table.createFamily': { fr: 'Table famille', en: 'Family Table' },
  'rsvp.table.familyName': { fr: 'Nom de la table', en: 'Table Name' },
  'rsvp.table.familyName.placeholder': { fr: 'Ex: Famille Martin', en: 'E.g. The Smiths' },
  'rsvp.table.yourSeat': { fr: 'Votre place', en: 'Your seat' },
  'rsvp.done.title': { fr: 'Merci !', en: 'Thank You!' },
  'rsvp.done.attending': { fr: 'Votre réponse a été enregistrée. Nous avons hâte de vous voir !', en: 'Your response has been recorded. We can\'t wait to see you!' },
  'rsvp.done.notattending': { fr: 'Nous sommes désolés que vous ne puissiez pas venir. Vous serez dans nos pensées.', en: 'We\'re sorry you can\'t make it. You\'ll be in our thoughts.' },
  'rsvp.done.table': { fr: 'Votre table', en: 'Your Table' },

  // Gallery
  'gallery.title': { fr: 'Notre Galerie', en: 'Our Gallery' },
  'gallery.subtitle': { fr: 'Des moments précieux capturés en images', en: 'Precious moments captured in images' },

  // Registry
  'registry.title': { fr: 'Cadeaux', en: 'Gifts' },
  'registry.subtitle': { fr: 'Votre présence est notre plus beau cadeau', en: 'Your presence is our greatest gift' },
  'registry.message': { fr: 'Si vous souhaitez nous gâter, vous pouvez contribuer à notre nouvelle vie ensemble. Chaque geste compte énormément.', en: 'If you wish to spoil us, you can contribute to our new life together. Every gesture means the world.' },
  'registry.link': { fr: 'Voir la liste', en: 'View Registry' },
  'registry.tier.bouquet': { fr: 'Bouquet de fleurs', en: 'Flower Bouquet' },
  'registry.tier.toast': { fr: 'Toast des mariés', en: 'Wedding Toast' },
  'registry.tier.sparkle': { fr: 'Étoile filante', en: 'Shooting Star' },
  'registry.tier.diamond': { fr: 'Diamant', en: 'Diamond' },
  'registry.custom': { fr: 'Montant personnalisé', en: 'Custom Amount' },
  'registry.custom.placeholder': { fr: 'Montant', en: 'Amount' },
  'registry.give': { fr: 'Offrir', en: 'Give' },
  'registry.animalfund': { fr: 'Fonds pour les animaux', en: 'Animal Fund' },
  'registry.animalfund.desc': { fr: 'Contribuer à notre amour pour les animaux', en: 'Contribute to our love for animals' },
  'registry.dialog.title': { fr: 'Offrir un cadeau', en: 'Send a Gift' },
  'registry.dialog.subtitle': { fr: 'Votre générosité nous touche profondément', en: 'Your generosity touches us deeply' },
  'registry.dialog.amount': { fr: 'Montant du cadeau', en: 'Gift Amount' },
  'registry.dialog.name': { fr: 'Votre nom', en: 'Your Name' },
  'registry.dialog.name.placeholder': { fr: 'Prénom et nom', en: 'First and last name' },
  'registry.dialog.message': { fr: 'Un petit mot (optionnel)', en: 'A short message (optional)' },
  'registry.dialog.message.placeholder': { fr: 'Félicitations aux mariés...', en: 'Congratulations to the couple...' },
  'registry.dialog.send': { fr: 'Envoyer le cadeau', en: 'Send Gift' },
  'registry.dialog.thanks': { fr: 'Merci pour votre générosité !', en: 'Thank you for your generosity!' },
  'registry.dialog.note': { fr: 'Le paiement sera configuré prochainement. Merci de votre patience.', en: 'Payment will be configured soon. Thank you for your patience.' },

  // Explore
  'explore.title': { fr: 'Découvrez Notre Mariage', en: 'Explore Our Wedding' },
  'explore.subtitle': { fr: 'Tout ce que vous devez savoir', en: 'Everything you need to know' },

  // Love language
  'love.tagline': { fr: 'Deux cœurs, une seule âme', en: 'Two hearts, one soul' },
  'love.intro': { fr: 'Notre amour est une histoire écrite par Dieu, chaque chapitre plus beau que le précédent.', en: 'Our love is a story written by God, each chapter more beautiful than the last.' },
  'love.quote1': { fr: '"Je t\'ai aimé d\'un amour éternel, c\'est pourquoi je te conserve ma bonté."', en: '"I have loved you with an everlasting love; therefore I have continued my faithfulness to you."' },
  'love.quote1.ref': { fr: 'Jérémie 31:3', en: 'Jeremiah 31:3' },
  'love.promise': { fr: 'Notre promesse d\'amour éternel', en: 'Our promise of everlasting love' },
  'love.promise.desc': { fr: 'Devant Dieu et nos proches, nous nous promettons un amour fidèle, patient et éternel.', en: 'Before God and our loved ones, we promise each other a faithful, patient, and eternal love.' },
  'love.soulmates': { fr: 'Âmes sœurs par la grâce de Dieu', en: 'Soulmates by the grace of God' },
  'love.together': { fr: 'Ensemble pour toujours', en: 'Together forever' },
  'love.loveStory': { fr: 'Une histoire d\'amour bénie', en: 'A blessed love story' },
  'love.loveStory.desc': { fr: 'Chaque jour avec toi est un cadeau du ciel. Notre amour grandit comme un jardin arrosé par la grâce divine.', en: 'Every day with you is a gift from heaven. Our love grows like a garden watered by divine grace.' },
  'love.countdownLabel': { fr: 'Jours avant notre « Oui, je le veux »', en: 'Days until our "I do"' },
  'love.joinUs': { fr: 'Joignez-vous à notre célébration d\'amour', en: 'Join our celebration of love' },

  // Footer
  'footer.made': { fr: 'Fait avec amour', en: 'Made with love' },
  'footer.copyright': { fr: '© 2025 Corine & Ruben', en: '© 2025 Corine & Ruben' },
  'footer.links': { fr: 'Liens', en: 'Links' },
  'footer.celebrate': { fr: 'Célébrer', en: 'Celebrate' },
  'footer.venue': { fr: 'Lieu', en: 'Venue' },

  // 404
  'notfound.title': { fr: 'Page Introuvable', en: 'Page Not Found' },
  'notfound.desc': { fr: 'Cette page s\'est égarée avant la célébration.', en: 'It seems this page wandered off before the celebration.' },
  'notfound.requested': { fr: 'Demandé', en: 'Requested' },
  'notfound.returnHome': { fr: 'Retour à l\'accueil', en: 'Return Home' },
  'notfound.goBack': { fr: 'Retour', en: 'Go Back' },
  'notfound.needHelp': { fr: 'Besoin d\'aide ?', en: 'Need help?' },
  'notfound.reachOut': { fr: 'Contactez les mariés', en: 'Reach out to the couple' },
  'notfound.contactUs': { fr: 'Nous contacter', en: 'Contact Us' },
  'notfound.howWeMet': { fr: 'Notre rencontre', en: 'How we met' },
  'notfound.confirmAttendance': { fr: 'Confirmer présence', en: 'Confirm attendance' },
  'notfound.venueSchedule': { fr: 'Lieu & programme', en: 'Venue & schedule' },
  'notfound.backToStart': { fr: 'Retour au début', en: 'Back to the beginning' },

  // Christian / Hymns
  'badge.blessed': { fr: 'Union Bénie', en: 'Blessed Union' },
  'badge.faith': { fr: 'Foi & Amour', en: 'Faith & Love' },
  'badge.garden': { fr: 'Jardin d\'Éden', en: 'Garden Party' },
  'badge.covenant': { fr: 'Alliance Sacrée', en: 'Holy Covenant' },
  'index.scripture': { fr: 'Écriture', en: 'Scripture' },
  'index.sacredUnion': { fr: 'Union Sacrée', en: 'Sacred Union' },
  'index.covenantLove': { fr: 'Amour d\'Alliance', en: 'Covenant Love' },
  'index.foreverAlways': { fr: 'Pour Toujours', en: 'Forever & Always' },
  'index.beginJourney': { fr: 'Début du Voyage', en: 'Begin the Journey' },
  'index.years': { fr: 'Ans', en: 'Years' },
  'index.worshipMusic': { fr: 'Musique de Louange', en: 'Worship Music' },
  'index.hymns': { fr: 'Nos Cantiques', en: 'Our Hymns' },
  'index.hymns.desc': { fr: 'Les chants qui accompagneront notre célébration', en: 'The songs that will accompany our celebration' },
  'hymn.amazing': { fr: 'Grâce Infinie', en: 'Amazing Grace' },
  'hymn.blessed': { fr: 'Béni Soit le Lien', en: 'Blessed Be the Tie' },
  'hymn.howgreat': { fr: 'Que Tu Es Grand', en: 'How Great Thou Art' },
  'hymn.joyful': { fr: 'Joie au Monde', en: 'Joyful, Joyful' },
  'hymn.greatis': { fr: 'Grande Est Ta Fidélité', en: 'Great Is Thy Faithfulness' },
  'hymn.traditional': { fr: 'Hymne Traditionnel', en: 'Traditional Hymn' },
  'verse.1cor13': { fr: 'L\'amour est patient, l\'amour est bon. Il n\'envie pas, il ne se vante pas, il ne s\'enfle pas d\'orgueil.', en: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.' },
  'verse.genesis': { fr: 'C\'est pourquoi l\'homme quittera son père et sa mère, et s\'attachera à sa femme, et ils deviendront une seule chair.', en: 'Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh.' },
  'verse.ecclesiastes': { fr: 'Deux valent mieux qu\'un seul, car ils ont un bon salaire de leur travail. Car s\'ils tombent, l\'un relève son compagnon.', en: 'Two are better than one, because they have a good reward for their toil. For if they fall, one will lift up his fellow.' },
  'verse.proverbs': { fr: 'Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta propre intelligence. Reconnais-le dans toutes tes voies, et il aplanira tes sentiers.', en: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.' },
  'index.foundedOnFaith': { fr: 'Fondé sur la Foi', en: 'Founded on Faith' },
  'index.ceremony': { fr: 'Cérémonie Sacrée', en: 'Sacred Ceremony' },
  'index.ceremony.desc': { fr: 'Une célébration d\'amour devant Dieu, notre famille et nos amis les plus chers.', en: 'A celebration of love before God, our family, and our dearest friends.' },
  'index.blessing': { fr: 'Bénédiction Divine', en: 'Divine Blessing' },
  'index.blessing.desc': { fr: 'Recevant la grâce et la bénédiction de Dieu sur notre union sacrée.', en: 'Receiving God\'s grace and blessing upon our sacred union.' },
  'index.vows': { fr: 'Vœux Éternels', en: 'Eternal Vows' },
  'index.vows.desc': { fr: 'Des promesses faites devant Dieu, scellées par la foi et l\'amour éternel.', en: 'Promises made before God, sealed by faith and eternal love.' },
  'index.fellowship': { fr: 'Communion Fraternelle', en: 'Fellowship & Joy' },
  'index.fellowship.desc': { fr: 'Célébrer ensemble dans la joie, la prière et la reconnaissance.', en: 'Celebrating together in joy, prayer, and gratitude.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('wedding-lang');
    return (saved === 'en' || saved === 'fr') ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('wedding-lang', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
