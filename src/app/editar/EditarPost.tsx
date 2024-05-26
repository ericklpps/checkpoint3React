//Formulário de editar postagem, ele só abre se quiser realizar uma alteração

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
            <br/>
            <h1 className="text-2xl font-bold mb-4 text-center">Editar Post</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <label className="block text-gray-700 font-bold mb-2">Título:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border border-gray-600 px-4 py-2 rounded-md w-full mb-4"
                    required/>
                <label className="block text-gray-700 font-bold mb-2">Data:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-600 px-4 py-2 rounded-md w-full mb-4"
                    required/>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2" type="submit">Salvar</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md" type="button" onClick={onCancel}>Cancelar</button>
                <br/>
            </form>     
        </>
    );
};

export default EditPost;
