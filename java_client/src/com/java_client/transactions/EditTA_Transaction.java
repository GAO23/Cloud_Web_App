package com.java_client.transactions;

import com.java_client.data.TeachingAssistantPrototype;
import libs.jTPS.jTPS_Transaction;

/**
 *
 * @author McKillaGorilla
 */
public class EditTA_Transaction implements jTPS_Transaction {
    TeachingAssistantPrototype taToEdit;
    String oldName, newName;
    String oldEmail, newEmail;
    String oldType, newType;
    
    public EditTA_Transaction(TeachingAssistantPrototype initTAToEdit, 
            String name, String email, String type) {
        taToEdit = initTAToEdit;
        oldName = initTAToEdit.getName();
        oldEmail = initTAToEdit.getEmail();
        oldType = initTAToEdit.getType();
        newName = name;
        newEmail = email;
        newType = type;
    }


    @Override
    public void doTransaction() {
        taToEdit.setName(newName);
        taToEdit.setEmail(newEmail);
        taToEdit.setType(newType);
    }

    @Override
    public void undoTransaction() {
        taToEdit.setName(oldName);
        taToEdit.setEmail(oldEmail);
        taToEdit.setType(oldType);
    }
}