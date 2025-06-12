import React from 'react';
import './DeleteConfirmationModal.css';

export default function DeleteConfirmationModal({ onDelete, onCancel }) {
    return (
        <div className='modal'>
            <div className='confirm-overlay'></div>
            <div className='confirm-modal-content'>
                <div className='confirm-loginmodal'>
                    <label className='confirm-head'>Are you sure you want to delete?</label>

                    <div className='confirm-modal-btns'>
                        <button className='confirm-delete' onClick={onDelete}>Delete</button>
                        <button className='confirm-cancel' onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
