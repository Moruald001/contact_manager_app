/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line prettier/prettier
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Link, router } from '@inertiajs/react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactList({ contacts, onEdit }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [contactsFound, setContactsFound] = useState({});

    const handleChange = (event) => {
        const term = event.target.value.trim();
        setSearchTerm(term);
        console.log(term);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setContactsFound({});
        if (searchTerm.trim() === '') {
            setContactsFound({});
            return;
        }
        if (
            contacts.some(
                (contact) =>
                    contact.firstname
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    contact.lastname
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
            )
        ) {
            const foundContact = contacts.find(
                (contact) =>
                    contact.firstname
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    contact.lastname
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
            );
            setContactsFound((prev) => ({
                ...prev,
                [foundContact.id]: foundContact,
            }));
        }
    };

    const handleDelete = (contact) => {
        if (confirm('Vous etes sur le point de supprimer ce contact !!!')) {
            router.delete(route('contacts.destroy', contact.id));
        }
    };

    return (
        <div className="rounded-md border p-10">
            <form
                onSubmit={handleSearch}
                className="flex flex-col items-start justify-between"
            >
                <label
                    htmlFor="search"
                    className="mb-3 ml-10 mt-10 font-semibold"
                >
                    Rechercher un contact
                </label>
                <div className="flex justify-center">
                    <Input
                        name="search"
                        className="mx-10 mb-5 w-[40vw] shadow-md"
                        placeholder="Entrez le nom d'un contact"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <Button type="submit">Rechercher</Button>
                </div>
            </form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telephone</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.keys(contactsFound).length > 0
                        ? Object.values(contactsFound).map((contactFound) => (
                              <TableRow key={contactFound.id}>
                                  <TableCell className="font-medium">
                                      {contactFound.lastname}{' '}
                                      {contactFound.firstname}
                                  </TableCell>
                                  <TableCell>{contactFound.email}</TableCell>
                                  <TableCell>
                                      {contactFound.phoneNumber}
                                  </TableCell>
                                  <TableCell className="text-right">
                                      <div className="flex justify-end space-x-2">
                                          <Button
                                              variant="ghost"
                                              size="icon"
                                              asChild
                                          >
                                              <Link
                                                  href={route(
                                                      'contacts.show',
                                                      contactFound.id,
                                                  )}
                                              >
                                                  <Eye className="m-4 h-4" />
                                              </Link>
                                          </Button>
                                          <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() =>
                                                  onEdit(contactFound)
                                              }
                                          >
                                              <Edit className="m-4 h-4" />
                                          </Button>
                                          <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() =>
                                                  handleDelete(contactFound)
                                              }
                                          >
                                              <Trash2 className="m-4 h-4" />
                                          </Button>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))
                        : contacts.map((contact) => (
                              <TableRow key={contact.id}>
                                  <TableCell className="font-medium">
                                      {contact.lastname} {contact.firstname}
                                  </TableCell>
                                  <TableCell>{contact.email}</TableCell>
                                  <TableCell>{contact.phoneNumber}</TableCell>
                                  <TableCell className="text-right">
                                      <div className="flex justify-end space-x-2">
                                          <Button
                                              variant="ghost"
                                              size="icon"
                                              asChild
                                          >
                                              <Link
                                                  href={route(
                                                      'contacts.show',
                                                      contact.id,
                                                  )}
                                              >
                                                  <Eye className="m-4 h-4" />
                                              </Link>
                                          </Button>
                                          <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => onEdit(contact)}
                                          >
                                              <Edit className="m-4 h-4" />
                                          </Button>
                                          <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() =>
                                                  handleDelete(contact)
                                              }
                                          >
                                              <Trash2 className="m-4 h-4" />
                                          </Button>
                                      </div>
                                  </TableCell>
                              </TableRow>
                          ))}
                </TableBody>
            </Table>
        </div>
    );
}
