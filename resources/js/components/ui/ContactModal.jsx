import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import * as yup from 'yup';
import { Schema } from 'yup';

export default function ContactModal({
    showModal,
    modalType,
    selectedModal,
    onClose,
    contact,
}) {
    const { data, setData, post, put, errors, processing, reset } = useForm({
        firstname: contact?.firstname || '',
        lastname: contact?.lastname || '',
        email: contact?.email || '',
        phoneNumber: contact?.phoneNumber || '',
        notes: contact?.notes || '',
        image_path: contact?.image_path || '',
    });

    useEffect(() => {
        if (contact && modalType === 'edit') {
            setData({
                firstname: contact.firstname,
                lastname: contact.lastname,
                email: contact.email,
                phoneNumber: contact.phoneNumber,
                notes: contact.notes,
                image_path: contact.image_path,
            });
        } else if (contact && modalType === 'create') {
            reset();
        }
    }, [contact, showModal, modalType]);

    const validatedForm = async () => {
        try {
            await Schema.validate(data, { abortEarly: false });
            return true;
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const validationErrors = {};
                error.inner.foreach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                return false;
            }

            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validatedForm();

        if (!isValid) {
            return;
        }

        if (modalType === 'create') {
            post(route('contact.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    handleClose();
                    router.reload;
                },
            });
        } else {
            put(route('contact.update', contact?.id), {
                preserveScroll: true,
                onSuccess: () => {
                    handleClose();
                    router.reload();
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    const handleClose = () => {
        if (modalType === 'create') {
            reset();
        }
        console.log(data.image_path);
        onClose();
    };
    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <DialogContent className="max-w-[435px]">
                <DialogHeader>
                    <DialogTitle>
                        {modalType === 'create'
                            ? 'Nouveau contact'
                            : 'Modifier contact'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid-cols2 grid gap-4">
                        <div className="space-y-4">
                            <Label htmlFor="firstname">Prenom</Label>
                            <Input
                                id="firstname"
                                value={data.firstname}
                                onChange={(e) =>
                                    setData('firstname', e.target.value)
                                }
                                className={errors.firstname && 'border-red-500'}
                            />
                            {errors.firstname && (
                                <p className="text-sm text-red-500"></p>
                            )}
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="lastname">Nom</Label>
                            <Input
                                id="lastname"
                                value={data.lastname}
                                onChange={(e) =>
                                    setData('lastname', e.target.value)
                                }
                                className={errors.lastname && 'border-red-500'}
                            />
                            {errors.lastname && (
                                <p className="text-sm text-red-500"></p>
                            )}
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="email">email</Label>
                            <Input
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className={errors.email && 'border-red-500'}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500"></p>
                            )}
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="phoneNumber">
                                Numero de telephone
                            </Label>
                            <Input
                                id="phoneNumber"
                                value={data.phoneNumber}
                                onChange={(e) =>
                                    setData('phoneNumber', e.target.value)
                                }
                                className={
                                    errors.phoneNumber && 'border-red-500'
                                }
                            />
                            {errors.phoneNumber && (
                                <p className="text-sm text-red-500"></p>
                            )}
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="notes">notes</Label>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                                className={
                                    errors.notes &&
                                    'border-red-500' + 'resize-none'
                                }
                            />
                            {errors.notes && (
                                <p className="text-sm text-red-500"></p>
                            )}
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="image_path">image</Label>
                            <input
                                id="image_path"
                                type="file"
                                value={data.image_path}
                                onChange={(e) =>
                                    setData('image_path', e.target.value)
                                }
                            />
                            {errors.image_path && (
                                <p className="text-sm text-red-500"></p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant={'outline'}
                            type="button"
                            onClick={handleClose}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant={'outline'}
                            type="button"
                            onClick={handleClose}
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
