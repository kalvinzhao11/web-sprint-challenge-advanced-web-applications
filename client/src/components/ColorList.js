import React, { useState } from "react";
import axios from "axios";

import {axiosWithAuth} from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};
const initialNewColor = {
  color: "",
  code: { hex: "" },
  id: Date.now(),
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialNewColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(colors.map(color => {
          if (color.id == colorToEdit.id) {
            return res.data
        } else {
            return color
        }
        }))
      })
      .catch(err => console.log(err))
    console.log(colorToEdit)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${colorToEdit.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id != colorToEdit.id))
      })
      .catch(err => console.log(err))
  };

  const addColor = (e) => {
    e.preventDefault()
    if (!newColor.color || !newColor.code.hex) return 
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        updateColors([...colors, newColor])
        setNewColor(initialNewColor)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <div className="spacer">
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add color</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
