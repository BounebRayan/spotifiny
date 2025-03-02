'use client'
import { motion } from 'framer-motion';
import { FaLock, FaSpotify, FaRegCreditCard, FaUndo, FaQuestionCircle } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';

export default function Features() {
  return (
    <motion.div 
    className="md:pb-16 pb-16 md:pt-6 md:px-24 px-7 pt-2 text-white"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
    <section className="">
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Comment ça marche</h2>
        <p className="text-gray-400 mb-4">
        Achetez une clé, passez votre compte Spotify en Premium et profitez d’un service simple et sécurisé. <br /> Si votre compte est rétrogradé et perd son statut Premium, vous pouvez le renouveler facilement avec la même clé.
        </p>
        <div className="w-1/3 mx-auto border-t border-gray-600 sm:mb-8 mb-4"></div>

        {/* Steps Grid */}
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 flex overflow-x-auto space-x-6 pb-4">
  {/* Step 1: Buy a Key */}
  <div className="min-w-[250px] sm:w-auto sm:px-8 md:py-8 py-3 shadow-lg">
    <FaRegCreditCard className="text-4xl text-green-500 mx-auto sm:mb-4 mb-3" />
    <h3 className="text-2xl font-semibold mb-2">Achetez une clé</h3>
    <p className="text-gray-400">
      {/*Nous acceptons les paiements par carte bancaire et E-Dinar. Un seul paiement, et vous êtes prêt à profiter du service !*/}
      Pour le moment, nous acceptons uniquement les paiements par carte E-Dinar ou Main à Main. Un seul paiement, et vous êtes prêt à profiter du service !
    </p>
  </div>

  {/* Step 2: Upgrade Spotify */}
  <div className="min-w-[250px] sm:w-auto sm:px-8 md:py-8 py-3 shadow-lg">
    <FaSpotify className="text-4xl text-green-500 mx-auto sm:mb-4 mb-3" />
    <h3 className="text-2xl font-semibold mb-2">Passez en Premium</h3>
    <p className="text-gray-400">
      Utilisez la clé achetée pour passer votre compte Spotify en Premium à vie et profitez de toutes ses fonctionnalités.
    </p>
  </div>

  {/* Step 3: Renew if Downgraded */}
  <div className="min-w-[250px] sm:w-auto sm:px-8 md:py-8 py-3 shadow-lg">
    <FaUndo className="text-4xl text-green-500 mx-auto sm:mb-4 mb-3" />
    <h3 className="text-2xl font-semibold mb-2">Renouvelez facilement</h3>
    <p className="text-gray-400">
      Si jamais vous perdez votre statut Premium, utilisez simplement la même clé pour renouveler sans complications.
    </p>
  </div>

  {/* Step 4: Secure & Trusted */}
  <div className="min-w-[250px] sm:w-auto sm:px-8 md:py-8 py-3 shadow-lg">
    <FaLock className="text-4xl text-green-500 mx-auto sm:mb-4 mb-3" />
    <h3 className="text-2xl font-semibold mb-2">Sécurisé et fiable</h3>
    <p className="text-gray-400">
      Le processus est 100% sécurisé. Nous garantissons la protection de vos informations personnelles.
    </p>
  </div>

  {/* Step 5: Simple & Effective */}
  <div className="min-w-[250px] sm:w-auto  sm:px-8 md:py-8 py-3 shadow-lg">
    <HiUserGroup className="text-4xl text-green-500 mx-auto sm:mb-4 mb-3" />
    <h3 className="text-2xl font-semibold mb-2">Simple et efficace</h3>
    <p className="text-gray-400">
      Notre plateforme est conçue pour être à la fois intuitive et facile à utiliser, offrant une expérience fluide et rapide.
    </p>
  </div>

  {/* Step 6: Why Premium? */}
  <div className="min-w-[250px] sm:w-auto  sm:px-8 md:py-8 py-3 shadow-lg">
    <FaQuestionCircle className="text-4xl text-green-500 mx-auto sm:mb-4 mb-3" />
    <h3 className="text-2xl font-semibold mb-2">Spotify Premium ?</h3>
    <p className="text-gray-400">
    Téléchargez vos musiques pour une écoute hors ligne, bénéficiez d’un son haute qualité et zappez sans limite, le tout sans publicité
    </p>
  </div>
</div>

      </div>
    </section>
    </motion.div>
  );
}
