import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContactList from '@/components/ui/ContactList';
import ContactModal from '@/components/ui/ContactModal';

import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({ contacts }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(undefined);
    const [modalTypes, setModaltypes] = useState('create');

    const handleCreate = () => {
        setModaltypes('create');
        setSelectedContact(undefined);
        setShowModal(true);
    };

    const handleEdit = (contact) => {
        setModaltypes('edit');
        setSelectedContact(contact);
        setShowModal(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Carnet
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Mes contacts
                            </h2>

                            <Button onClick={handleCreate} className="mt-4">
                                <Plus className="h-5 w-5" />
                                Nouveau contact
                            </Button>
                        </div>
                        <ContactModal
                            showModal={showModal}
                            modalTypes={modalTypes}
                            contact={selectedContact}
                            onClose={() => setShowModal(false)}
                        />
                        <ContactList contacts={contacts} onEdit={handleEdit} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
