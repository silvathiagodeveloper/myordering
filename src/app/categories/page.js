'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { resolve } from "path";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage(){
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const {loading:profileLoading, data:profileData} = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  },[])

  function fetchCategories(){
    fetch('/api/categories', {
      mehot: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(res => {
      res.json().then(data => {
        setCategories(data);
      });
    });
  }

  function handleCategorySubmit(ev){
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
        const data = {name: categoryName};
        if(editedCategory){
          data._id = editedCategory._id;
        }
        const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      if(response.ok) {
        setCategoryName('');
        setEditedCategory(null);
        fetchCategories();
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(creationPromise, {
      loading: editedCategory ? 'Updating...' : 'Creating...',
      success: editedCategory ? 'Category updated!' : 'Category created!',
      error: editedCategory ? 'Error when updating!' : 'Error when creating!',
    });
  }

  function handleDeleteClick(_id){
    const deletetionPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('api/categories?_id='+_id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      });
      if(response.ok){
        fetchCategories();
        resolve();
      }else {
        reject();
      }
    });
    toast.promise(deletetionPromise,{
      loading: 'Deleting...',
      success: 'Category deleted',
      error: 'Error when deleting'
    });
  }

  if(profileLoading){
    return 'Loading user info...';
  }

  if(!profileData.admin){
    return 'Not admin!';
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs admin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? 'Update category': 'New category name'}
              {editedCategory && (
                <>: <b>{editedCategory.name}</b></>
              )}
            </label>
            <input type="text" value={categoryName} onChange={ev => setCategoryName(ev.target.value)} />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit">{editedCategory ? 'Update' : 'Create'}</button>
            <button type="button" 
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}>Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        {categories?.length > 0 && categories.map(category => (
          <div key={category._id} className="flex gap-1 bg-gray-100 rounded-xl p-2 px-4 mb-1 items-center">
            <div className="grow">{category.name}</div>
            <div className="flex gap-1">
              <button 
                onClick={() => {
                  setEditedCategory(category);
                  setCategoryName(category.name);
                }}
              >
                Edit
              </button>
              <button 
                onClick={() => {handleDeleteClick(category._id)}}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}