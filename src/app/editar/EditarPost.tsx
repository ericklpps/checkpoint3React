// src/app/editar/EditPost.tsx
import React, { useState } from "react";
import { editPost } from "@/app/services/ApiPosts";
import { IPost } from "@/app/types/Post";

interface EditPostProps {
    post: IPost;
    onPostEdited: (updatedPost: IPost) => void;
    onCancel: () => void;
}

const EditPost: React.FC<EditPostProps> = ({ post, onPostEdited, onCancel }) => {
    const [formData, setFormData] = useState<IPost>({ ...post });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const updatedPost = await editPost(post.id!, formData);
            alert('Post editado com sucesso');
            onPostEdited(updatedPost);
        } catch (error) {
            console.error('Erro ao editar post', error);
            alert('Erro ao editar post');
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
            <h1>Editar Post</h1>
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
                <button className="bg-blue-500" type="submit">Salvar</button>
                <button type="button" onClick={onCancel} className="bg-gray-500 ml-2">Cancelar</button>
            </form>
        </>
    );
};

export default EditPost;
