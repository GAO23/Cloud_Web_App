/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.java_client.transactions;

import com.java_client.data.GeneratorData;
import com.java_client.data.ScheduleItem;
import com.java_client.workspace.controllers.ScheduleController;
import libs.jTPS.jTPS_Transaction;

/**
 *
 * @author xgao
 */
public class removeScheduleTransaction implements jTPS_Transaction{

    private GeneratorData data;
    private ScheduleItem item;
    private int index;
    private ScheduleController controller;
    
    public removeScheduleTransaction(ScheduleItem item, GeneratorData data, ScheduleController controller){
        this.data = data;
        this.item = item;
        this.index = data.getBackUpSchedules().indexOf(item);
        this.controller = controller;
    }
    
    @Override
    public void doTransaction() {
        data.removeSchedule(item);
        controller.handleRemoveCleanUp();
        data.updateScheduleStartEndSelect();
    }

    @Override
    public void undoTransaction() {
       data.addScheduleItemToIndex(index, item);
       data.updateScheduleStartEndSelect();
    }
    
}
