// src/app/adicionar/AddPost.tsx
import React, { useState } from "react";
import { addPost } from "@/app/services/ApiPosts";
import { IPost } from "@/app/types/Post";

interface AddPostProps {
    onPostAdded: (newPost: IPost) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onPostAdded }) => {
    const [formData, setFormData] = useState<IPost>({ title: '', date: '', image: '' });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const newPost = await addPost(formData);
            alert('Post adicionado com sucesso');
            setFormData({ title: '', date: '', image: '' });
            onPostAdded(newPost);
        } catch (error) {
            console.error('Erro ao adicionar post', error);
            alert('Erro ao adicionar post');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <h1>Adicionar Post</h1>
            <form onSubmit={handleSubmit}>
                <label>Título:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border border-gray-600"
                    required
                />
                <label>Data:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-600"
                    required
                />
                <label>URL da Imagem:</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="border border-gray-600"
                    required
                />
                <button className="bg-red-500" type="submit">Adicionar Post</button>
            </form>
        </>
    );
};

export default AddPost;
