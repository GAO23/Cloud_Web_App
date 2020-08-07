package com.java_client.transactions;

import com.java_client.GeneratorApp;
import com.java_client.data.GeneratorData;
import com.java_client.data.TeachingAssistantPrototype;
import libs.jTPS.jTPS_Transaction;

public class PasteTA_Transaction implements jTPS_Transaction {
    GeneratorApp app;
    TeachingAssistantPrototype taToPaste;

    public PasteTA_Transaction(  GeneratorApp initApp, 
                                 TeachingAssistantPrototype initTAToPaste) {
        app = initApp;
        taToPaste = initTAToPaste;
    }

    @Override
    public void doTransaction() {
        GeneratorData data = (GeneratorData)app.getDataComponent();
        data.addTA(taToPaste);
    }

    @Override
    public void undoTransaction() {
        GeneratorData data = (GeneratorData)app.getDataComponent();
        data.removeTA(taToPaste);
    }   
}