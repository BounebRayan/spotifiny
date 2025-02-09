'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  return (
    <motion.div
      className="pb-6 md:px-24 bg-black text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:max-w-6xl mx-auto bg-black text-white md:mt-10 py-8 md:px-12 px-8 rounded-md">
        <FaQuestionCircle className="text-5xl text-green-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-center mb-4">Questions Fréquemment Posées</h1>
        <div className="w-1/2 mx-auto border-t border-gray-600 mb-6"></div>

        <h2 className="text-lightgreen text-xl mb-1 text-green-500 font-semibold" id="codes">Codes de Réponse Communs</h2>
        <p className="mb-4">
          Voici quelques-uns des messages de réponse que le système peut vous donner lors des phases de upgrade ou de Renouvellement :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Compte dans la file d'attente :</strong> La demande de mise à niveau/renouvellement a été ajoutée à la liste d'attente. Dès que ce sera votre tour, votre compte sera automatiquement mis à jour/mis à niveau.</li>
          <li><strong>Mise à niveau/renouvellement en cours :</strong> La mise à niveau/renouvellement est en cours. Dans quelques minutes, vous recevrez automatiquement le résultat.</li>
          <li><strong>Hors stock :</strong> Le pays que vous avez spécifié lors de la mise à niveau est maintenant hors stock. Veuillez utiliser un autre pays ou attendre un réapprovisionnement.</li>
          <li><strong>Détails du compte invalides :</strong> Les détails fournis sont incorrects. Veuillez vérifier que votre adresse e-mail/nom d'utilisateur et mot de passe sont corrects.</li>
          <li><strong>12 Mois :</strong> Spotify ne permet pas d'entrer une famille plus d'une fois par an. Dans ce cas, vous devrez fournir un nouveau compte.</li>
          <li><strong>Déjà Premium :</strong> Le compte fourni est déjà Premium et ne peut donc pas être mis à niveau.</li>
          <li><strong>Erreur système :</strong> Le système a rencontré une erreur qui ne peut pas être traduite. Dans ce cas, il essaie de renvoyer la demande de mise à niveau/renouvellement.</li>
        </ul>

        <h2 className="text-lightgreen text-xl mb-1 text-green-500 font-semibold" id="pays">Disponibilité dans Votre Pays</h2>
        <p className="mb-4">
          Nous mettons à jour notre stock avec des comptes de divers pays chaque semaine. Cependant, certains pays peuvent être plus difficiles à réapprovisionner. Si votre pays est actuellement indisponible, nous vous remercions de votre patience et vous recommandons d'attendre notre prochain cycle de réapprovisionnement.
        </p>
        <p className="mb-4">
          Sinon, vous pouvez opter pour un compte d'un autre pays, ce qui peut entraîner de légères variations dans le catalogue musical disponible pour vous. Nous nous engageons à fournir un large éventail d'options et apprécions votre compréhension.
        </p>

        <h2 className="text-lightgreen text-xl mb-1 text-green-500 font-semibold" id="renew">Renouvellement</h2>
        <p className="mb-4">
          Si vous recevez un e-mail vous informant que votre compte ne fait plus partie du plan familial, cela signifie que vous avez perdu votre statut Premium. Par conséquent, vous êtes éligible pour un renouvellement. Dans ce cas, veuillez visiter la page de renouvellement et entrer les détails du compte concerné.
        </p>
        <p className="mb-4">
          Ensuite, vous pouvez choisir entre deux options :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Soumettre simplement le compte déclassé, et le système renouvellera la clé, la rendant à nouveau utilisable sur la page de mise à niveau.</li>
          <li>Fournir un nouvel e-mail qui n'est pas lié à un compte Spotify existant, ainsi qu'un nouveau mot de passe. Le système créera alors et mettra à niveau un nouveau compte, en important vos chansons aimées, playlists et abonnements.</li>
        </ul>
        <p className="mb-4">
          Dans le cas de la deuxième option, il est de votre responsabilité de sauvegarder en toute sécurité votre nouveau mot de passe. Si vous perdez l'accès à votre compte en raison d'un mot de passe oublié, votre clé de mise à niveau deviendra inutilisable et ne pourra pas être récupérée.
        </p>

        <h2 className="text-lightgreen text-xl mb-1 text-green-500 font-semibold" id="restock">Réapprovisionnement</h2>
        <p className="mb-4">
          Nos réapprovisionnements ont généralement lieu chaque semaine. Cependant, dans des circonstances rares nécessitant un réapprovisionnement plus fréquent, nous pouvons le faire tous les 2 jours. Veuillez noter que notre équipe s'efforce de garantir la plus grande disponibilité possible en stock, et les horaires de réapprovisionnement sont minutieusement planifiés pour répondre à la demande.
        </p>
        <p className="mb-4">
          Par conséquent, l'ouverture de tickets ou l'envoi de demandes concernant les réapprovisionnements n'influencera pas l'horaire, car nous maximisons déjà nos efforts dans ce domaine. Nous vous remercions de votre compréhension et de votre patience.
        </p>

        <h2 className="text-lightgreen text-xl mb-1 text-green-500 font-semibold" id="security">Sécurité</h2>
        <p className="mb-4">
          Profitez d'un processus de mise à niveau 100 % sûr et sans tracas avec nous ! Nous assurons une sécurité de premier ordre, sans conserver de journaux, garantissant l'intégrité de votre compte. Il n'est pas nécessaire d'utiliser des e-mails temporaires ou fictifs – leur utilisation ne ferait que compromettre votre compte. Faites-nous confiance pour une expérience de mise à niveau fluide et sécurisée.
        </p>

        <h2 className="text-lightgreen text-xl mb-1 text-green-500 font-semibold" id="garantie">Garantie à Vie</h2>
        <p className="mb-4">
          Le terme « à vie » dans notre service fait référence à la durée de vie de notre plateforme, Upgrader.cc. Avec nos mises à niveau Spotify, nous offrons une garantie à vie pendant la durée de notre service actif.
        </p>
        <p className="mb-4">
          Cela signifie que nous offrons des remplacements illimités et gratuits pour tout compte déclassé qui se produit pendant cette période. Rassurez-vous, nous nous engageons à garantir votre satisfaction continue avec notre service tant que nous opérons.
        </p>

        <p className="text-center text-gray-400 mt-6">
        Si vous rencontrez des problèmes ou avez des questions, <Link href="/contact-us" className='font-semibold'>contactez-nous</Link> pour obtenir de l'aide.
        </p>
      </div>
    </motion.div>
  );
};

export default FAQ;
