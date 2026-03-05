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
  'hero.date': { fr: '___________', en: '___________' },
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
  'story.event1.title': { fr: '___________', en: '___________' },
  'story.event1.description': { fr: '___________', en: '___________' },
  'story.event1.date': { fr: '___________', en: '___________' },
  'story.event2.title': { fr: '___________', en: '___________' },
  'story.event2.description': { fr: '___________', en: '___________' },
  'story.event2.date': { fr: '___________', en: '___________' },
  'story.event3.title': { fr: '___________', en: '___________' },
  'story.event3.description': { fr: '___________', en: '___________' },
  'story.event3.date': { fr: '___________', en: '___________' },
  'story.event4.title': { fr: '___________', en: '___________' },
  'story.event4.description': { fr: '___________', en: '___________' },
  'story.event4.date': { fr: '___________', en: '___________' },
  'story.event5.title': { fr: '___________', en: '___________' },
  'story.event5.description': { fr: '___________', en: '___________' },
  'story.event5.date': { fr: '___________', en: '___________' },
  'story.continues': { fr: 'Notre aventure continue...', en: 'Our journey continues...' },

  // Details
  'details.title': { fr: 'Détails du Mariage', en: 'Wedding Details' },
  'details.subtitle': { fr: 'Tout ce que vous devez savoir pour cette journée spéciale', en: 'Everything you need to know for this special day' },
  'details.ceremony': { fr: 'Cérémonie', en: 'Ceremony' },
  'details.ceremony.time': { fr: '___________', en: '___________' },
  'details.ceremony.location': { fr: '___________', en: '___________' },
  'details.ceremony.address': { fr: '___________', en: '___________' },
  'details.reception': { fr: 'Réception', en: 'Reception' },
  'details.reception.time': { fr: '___________', en: '___________' },
  'details.reception.location': { fr: '___________', en: '___________' },
  'details.reception.address': { fr: '___________', en: '___________' },
  'details.accommodation': { fr: 'Hébergement', en: 'Accommodation' },
  'details.accommodation.desc': { fr: '___________', en: '___________' },
  'details.accommodation.hotel': { fr: '___________', en: '___________' },
  'details.accommodation.hotel.desc': { fr: '___________', en: '___________' },
  'details.accommodation.address': { fr: 'Adresse', en: 'Address' },
  'details.accommodation.address.desc': { fr: '___________', en: '___________' },
  'details.accommodation.rate': { fr: 'Tarif spécial', en: 'Special Rate' },
  'details.accommodation.rate.desc': { fr: '___________', en: '___________' },
  'details.transport': { fr: 'Transport', en: 'Transportation' },
  'details.transport.desc': { fr: '___________', en: '___________' },
  'details.transport.shuttle': { fr: 'Navette', en: 'Shuttle Service' },
  'details.transport.shuttle.desc': { fr: '___________', en: '___________' },
  'details.transport.parking': { fr: 'Stationnement', en: 'Parking' },
  'details.transport.parking.desc': { fr: '___________', en: '___________' },
  'details.transport.schedule': { fr: 'Horaires navette', en: 'Shuttle Schedule' },
  'details.transport.schedule.desc': { fr: '___________', en: '___________' },
  'details.tapToSee': { fr: 'Appuyez pour voir', en: 'Tap to view' },

  // Ceremony program
  'details.ceremony.program.welcome': { fr: '___________', en: '___________' },
  'details.ceremony.program.readings': { fr: 'Lectures Bibliques', en: 'Scripture Readings' },
  'details.ceremony.program.readings.desc': { fr: '___________', en: '___________' },
  'details.ceremony.program.vows': { fr: 'Échange des Vœux', en: 'Exchange of Vows' },
  'details.ceremony.program.vows.desc': { fr: '___________', en: '___________' },
  'details.ceremony.program.hymns': { fr: 'Cantiques', en: 'Hymns' },
  'details.ceremony.program.hymns.desc': { fr: '___________', en: '___________' },
  'details.ceremony.program.blessing': { fr: 'Bénédiction Finale', en: 'Final Blessing' },
  'details.ceremony.program.blessing.desc': { fr: '___________', en: '___________' },

  // Reception program
  'details.reception.program.cocktail': { fr: '___________', en: '___________' },
  'details.reception.program.dinner': { fr: 'Dîner', en: 'Dinner' },
  'details.reception.program.dinner.desc': { fr: '___________', en: '___________' },
  'details.reception.program.dance': { fr: 'Soirée Dansante', en: 'Dancing' },
  'details.reception.program.dance.desc': { fr: '___________', en: '___________' },
  'details.reception.program.cake': { fr: 'Gâteau de Mariage', en: 'Wedding Cake' },
  'details.reception.program.cake.desc': { fr: '___________', en: '___________' },

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
  'rsvp.cuisine': { fr: 'Choisissez votre cuisine', en: 'Choose Your Cuisine' },
  'rsvp.cuisine.african': { fr: 'Africaine', en: 'African' },
  'rsvp.cuisine.indian': { fr: 'Indienne', en: 'Indian' },
  'rsvp.cuisine.italian': { fr: 'Italienne', en: 'Italian' },
  'rsvp.cuisine.french': { fr: 'Française', en: 'French' },
  'rsvp.cuisine.mediterranean': { fr: 'Méditerranéenne', en: 'Mediterranean' },
  'rsvp.cuisine.caribbean': { fr: 'Caribéenne', en: 'Caribbean' },
  // African dishes
  'rsvp.meal.jollof': { fr: 'Riz Jollof', en: 'Jollof Rice' },
  'rsvp.meal.grilled_tilapia': { fr: 'Tilapia Grillé', en: 'Grilled Tilapia' },
  'rsvp.meal.veg_african': { fr: 'Végétarien Africain', en: 'African Vegetarian' },
  'rsvp.meal.ndole': { fr: 'Ndolé', en: 'Ndolé' },
  // Indian dishes
  'rsvp.meal.butter_chicken': { fr: 'Poulet Beurre', en: 'Butter Chicken' },
  'rsvp.meal.paneer_tikka': { fr: 'Paneer Tikka', en: 'Paneer Tikka' },
  'rsvp.meal.dal_makhani': { fr: 'Dal Makhani', en: 'Dal Makhani' },
  'rsvp.meal.biryani': { fr: 'Biryani', en: 'Biryani' },
  // Italian dishes
  'rsvp.meal.risotto': { fr: 'Risotto', en: 'Risotto' },
  'rsvp.meal.osso_buco': { fr: 'Osso Buco', en: 'Osso Buco' },
  'rsvp.meal.eggplant_parm': { fr: 'Aubergine Parmigiana', en: 'Eggplant Parmigiana' },
  'rsvp.meal.seafood_linguine': { fr: 'Linguine Fruits de Mer', en: 'Seafood Linguine' },
  // French dishes
  'rsvp.meal.coq_au_vin': { fr: 'Coq au Vin', en: 'Coq au Vin' },
  'rsvp.meal.ratatouille': { fr: 'Ratatouille', en: 'Ratatouille' },
  'rsvp.meal.salmon_en_croute': { fr: 'Saumon en Croûte', en: 'Salmon en Croûte' },
  'rsvp.meal.beef_bourguignon': { fr: 'Bœuf Bourguignon', en: 'Beef Bourguignon' },
  // Mediterranean dishes
  'rsvp.meal.lamb_kofta': { fr: 'Kofta d\'Agneau', en: 'Lamb Kofta' },
  'rsvp.meal.falafel_plate': { fr: 'Assiette Falafel', en: 'Falafel Plate' },
  'rsvp.meal.grilled_sea_bass': { fr: 'Bar Grillé', en: 'Grilled Sea Bass' },
  'rsvp.meal.stuffed_peppers': { fr: 'Poivrons Farcis', en: 'Stuffed Peppers' },
  // Caribbean dishes
  'rsvp.meal.jerk_chicken': { fr: 'Poulet Jerk', en: 'Jerk Chicken' },
  'rsvp.meal.curry_goat': { fr: 'Curry de Chèvre', en: 'Curry Goat' },
  'rsvp.meal.fish_escovitch': { fr: 'Poisson Escovitch', en: 'Escovitch Fish' },
  'rsvp.meal.callaloo_veg': { fr: 'Callaloo Végétarien', en: 'Callaloo Veggie' },
  // Meal notice
  'rsvp.meal.notice.title': { fr: 'Notre engagement pour une célébration sainte', en: 'Our commitment to a holy celebration' },
  'rsvp.meal.notice.body': { fr: 'En accord avec nos valeurs chrétiennes, nous ne servons pas d\'alcool (bière, vin, spiritueux) ni de viande non biblique (porc, crustacés, etc.). Tous nos plats sont préparés selon les principes alimentaires bibliques. Merci de votre compréhension. 🙏', en: 'In accordance with our Christian values, we do not serve alcohol (beer, wine, spirits) or non-biblical meats (pork, shellfish, etc.). All our dishes are prepared following biblical dietary principles. Thank you for your understanding. 🙏' },
  // Drinks
  'rsvp.drinks': { fr: 'Vos boissons', en: 'Your Drinks' },
  'rsvp.drinks.notice': { fr: '🚫 Pas d\'alcool — uniquement des boissons non alcoolisées pour honorer notre célébration', en: '🚫 No alcohol — only non-alcoholic beverages to honor our celebration' },
  'rsvp.drink.juice_tropical': { fr: 'Jus Tropical', en: 'Tropical Juice' },
  'rsvp.drink.lemonade': { fr: 'Citronnade', en: 'Lemonade' },
  'rsvp.drink.sparkling_water': { fr: 'Eau Pétillante', en: 'Sparkling Water' },
  'rsvp.drink.mocktail': { fr: 'Mocktail', en: 'Mocktail' },
  'rsvp.drink.tea': { fr: 'Thé', en: 'Tea' },
  'rsvp.drink.coffee': { fr: 'Café', en: 'Coffee' },
  'rsvp.drink.smoothie': { fr: 'Smoothie', en: 'Smoothie' },
  'rsvp.drink.hibiscus': { fr: 'Bissap / Hibiscus', en: 'Hibiscus Drink' },
  'rsvp.done.drinks': { fr: 'Vos boissons', en: 'Your Drinks' },
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
  'rsvp.side.plantain': { fr: 'Plantain frit', en: 'Fried Plantain' },
  'rsvp.side.cassava': { fr: 'Manioc', en: 'Cassava' },
  'rsvp.side.naan': { fr: 'Pain Naan', en: 'Naan Bread' },
  'rsvp.side.raita': { fr: 'Raïta', en: 'Raita' },
  'rsvp.side.bread': { fr: 'Pain artisanal', en: 'Artisan Bread' },
  'rsvp.side.polenta': { fr: 'Polenta', en: 'Polenta' },
  'rsvp.dietary': { fr: 'Restrictions alimentaires', en: 'Dietary Restrictions' },
  'rsvp.dietary.placeholder': { fr: 'Allergies, régime spécial...', en: 'Allergies, special diet...' },
  'rsvp.table.anonymous': { fr: 'Rester anonyme', en: 'Stay anonymous' },
  'rsvp.table.anonymous.hint': { fr: 'Votre nom sera affiché comme « Anonyme »', en: 'Your name will appear as "Anonymous"' },
  'rsvp.table.seats.available': { fr: 'places disponibles', en: 'seats available' },
  'rsvp.table.full': { fr: 'Complet', en: 'Full' },
  'rsvp.table.leave': { fr: 'Quitter', en: 'Leave' },
  'rsvp.table.join': { fr: 'Rejoindre', en: 'Join' },
  'rsvp.table.search': { fr: 'Rechercher une table...', en: 'Search for a table...' },
  'rsvp.table.filter.all': { fr: 'Toutes', en: 'All' },
  'rsvp.table.filter.available': { fr: 'Disponibles', en: 'Available' },
  'rsvp.table.filter.full': { fr: 'Complètes', en: 'Full' },
  'rsvp.table.summary': { fr: '{available} tables disponibles · {full} complètes sur {total}', en: '{available} available · {full} full out of {total} tables' },
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
  'love.intro': { fr: '___________', en: '___________' },
  'love.quote1': { fr: '"Je t\'ai aimé d\'un amour éternel, c\'est pourquoi je te conserve ma bonté."', en: '"I have loved you with an everlasting love; therefore I have continued my faithfulness to you."' },
  'love.quote1.ref': { fr: 'Jérémie 31:3', en: 'Jeremiah 31:3' },
  'love.promise': { fr: 'Notre promesse d\'amour éternel', en: 'Our promise of everlasting love' },
  'love.promise.desc': { fr: 'Devant Dieu et nos proches, nous nous promettons un amour fidèle, patient et éternel.', en: 'Before God and our loved ones, we promise each other a faithful, patient, and eternal love.' },
  'love.soulmates': { fr: 'Âmes sœurs par la grâce de Dieu', en: 'Soulmates by the grace of God' },
  'love.together': { fr: 'Ensemble pour toujours', en: 'Together forever' },
  'love.loveStory': { fr: 'Une histoire d\'amour bénie', en: 'A blessed love story' },
  'love.loveStory.desc': { fr: '___________', en: '___________' },
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
