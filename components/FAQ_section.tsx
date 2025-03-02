import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'

export default function FAQ() {
  return (
    <section className="py-10 pt-16 md:py-12 md:px-12 px-8 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Questions fréquemment posées</h2>
        <p className="text-gray-400 mb-8">
          Vous avez une question avant-vente sur nos produits et fonctionnalités ? <br /> Ou cherchez-vous un remboursement ? Nous serions ravis de répondre à toutes vos préoccupations.
        </p>

        <div className="">

          {/* Right Section (Other Questions) */}
          <div className="space-y-0">
            <Disclosure>
 
                <>
                  <DisclosureButton className="w-full p-4 border-t text-left focus:outline-none">
                    <span className="font-semibold flex items-center justify-between">Garantie à vie <ChevronDownIcon className="size-4 fill-white/60" /></span>
                  </DisclosureButton>
                  <DisclosurePanel className="pt-0 px-4 pb-4 text-gray-400 text-left">
                    "À vie" signifie que nos services, sont garantis pendant toute la durée de vie du service Spotifiny. Nous fournirons des remplacements illimités et gratuits pour toute régression pendant cette période.
                  </DisclosurePanel>
                </>

            </Disclosure>

            <Disclosure>

                <>
                  <DisclosureButton className="w-full p-4 border-t text-left focus:outline-none">
                    <span className="font-semibold flex items-center justify-between">Remplacements <ChevronDownIcon className="size-4 fill-white/60" /></span>
                  </DisclosureButton>
                  <DisclosurePanel className="pt-0 px-4 pb-4 text-gray-400 text-left">
                    Les remplacements sont gérés de manière transparente. Si vous avez déjà subi une régression, veuillez renouveler votre clé via la page <Link href="/renew" className='underline'>renew</Link> avant de la réutiliser.
                  </DisclosurePanel>
                </>

            </Disclosure>

            <Disclosure>

                <>
                  <DisclosureButton className="w-full p-4  border-t text-left focus:outline-none">
                    <span className="font-semibold flex items-center justify-between" >Sécurité <ChevronDownIcon className="size-4 fill-white/60" /></span>
                  </DisclosureButton>
                  <DisclosurePanel className="pt-0 px-4 text-gray-400 text-left">
                    Nous assurons à 100% la sécurité de votre compte. Aucune donnée n'est enregistrée et nous nous assurons que le processus de mise à niveau soit fluide, sans besoin de comptes fictifs.
                  </DisclosurePanel>
                </>

            </Disclosure>
          </div>
        </div>
      </div>
    </section>
  )
}
