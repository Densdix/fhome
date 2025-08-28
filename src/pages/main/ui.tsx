import { addImage, get, remove, removeImage, update, getContact, updateContact } from "@/entities/company/api";
import { ICompany, IContact } from "@/entities/company/types";
import { auth } from "@/shared/api/auth";
import { useState, FormEvent, useEffect } from "react";
const Main = () => {
    return (
        <div>
            <Authenticate />
            <Company />
        </div>
    );
};

export default Main;

const Authenticate = () => {
    const [name, setName] = useState('Matfei');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        auth(name);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                <button>Authenticate</button>
            </form>
        </div>
    );
};

const Company = () => {
    const [company, setCompany] = useState<ICompany | null>(null);
    const [contact, setContact] = useState<IContact | null>(null);

    const updateCompany = () => {
        if (!company) return;
        update(company.id, {
            name: 'New Name',
        }).then((data) => {
            setCompany(data);
        });
    }

    const removeCompany = () => {
        if (!company) return;
        remove(company.id).then(() => {
            setCompany(null);
        });
    }

    const handleAddImage = async (file: File) => {
        if (!company) return;
        try {
            await addImage(company.id, file);
            const updatedCompany = await get(company.id);
            setCompany(updatedCompany);
        } catch (error) {
            console.error('Error adding image:', error);
        }
    };

    const handleUpdateContact = () => {
        if (!contact) return;
        updateContact(contact.id, {
            email: 'new@email.com',
        }).then((data) => {
            setContact(data);
        });
    }

    useEffect(() => {
        get(12).then((data) => {
            setCompany(data);
        });
        getContact(16).then((data) => {
            setContact(data);
        });
    }, []);

    if (!company) return null;

    return (
        <div>
            <h1>{company.name}</h1>
            <h2>{contact?.email}</h2>
            <button onClick={handleUpdateContact}>Update Contact</button>
            {company.photos.map((photo) => (
                <div key={photo.name}>
                    <img src={photo.filepath} alt="company" />
                    <button onClick={() => removeImage(company.id, photo.name)}>Remove Image</button>
                </div>
            ))}
            <input type="file" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAddImage(file);
            }} />
            <button onClick={updateCompany}>Update</button>
            <button onClick={removeCompany}>Remove</button>
        </div>
    );
};
