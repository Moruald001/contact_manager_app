/* eslint-disable prettier/prettier */

import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BarChart2, ContactRound } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Accueil" />
            <nav className="fixed top-0 z-50 w-full border-b border-b-gray-300 bg-white">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <ContactRound />
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Tableau de borde
                                    </Link>
                                    <Link
                                        href={route('profile.edit')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Profil
                                    </Link>
                                    <Link
                                        method="post"
                                        as="button"
                                        href={route('logout')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Deconnexion
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        <Button>Inscription</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <section className="flex h-[90vh] items-center justify-center pt-16">
                <div className="relative">
                    <div className="mx-auto max-w-7xl px-6 py-24">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold text-gray-900">
                                Annuaire de contact
                            </h1>
                            <p className="text=gray-600 mt-6 text-xl">
                                Gerez simplement vos contact
                            </p>
                            <div className="mt-10">
                                {auth.user ? (
                                    <>
                                        <Link href={route('dashboard')}>
                                            <Button>
                                                Gerer vos contacts{' '}
                                                <BarChart2 className="h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <Link href={route('register')}>
                                        <Button>
                                            Commencer{' '}
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-t-gray-300 bg-white">
                <div className="auto px6 flex max-w-full items-center justify-center p-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy;{new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </>
    );
}
