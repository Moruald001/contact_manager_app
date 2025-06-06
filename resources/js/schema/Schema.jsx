import * as yup from 'yup';

export const Schema = yup
    .object()
    .shape({
        firstname: yup.string().required('Veuillez entrer un prenom'),
        lastname: yup.string().required('Veuillez entrer un nom'),
        email: yup.email().required('Email invalide'),
        phoneNumber: yup.string().nullable(),
        notes: yup.string().nullable(),
        image_path: yup
            .mixed()
            .required('Une image est requise')
            .test(
                'fileType',
                'Seules les images JPEG/PNG/GIF sont autorisées',
                (value) => {
                    const file = value?.[0];
                    return (
                        file &&
                        ['image/jpeg', 'image/png', 'image/gif'].includes(
                            file.type,
                        )
                    );
                },
            ),
    })
    .required('les données sont requis');
