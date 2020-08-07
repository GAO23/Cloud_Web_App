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
public class AddScheduleItemTransaction implements jTPS_Transaction{
    
    private ScheduleItem item;
    private GeneratorData data;
    private int index;
    private ScheduleController controller;
    
    public AddScheduleItemTransaction(ScheduleItem item, GeneratorData data, ScheduleController controller){
        this.item = item;
        this.data = data;
        this.index = data.getBackUpSchedules().indexOf(item);
        if(index == -1){
                this.index = data.getBackUpSchedules().size();
            }
        this.controller = controller;
    }
    
    
    
    

    @Override
    public void doTransaction() {
        data.addScheduleItemToIndex(index, item);
        data.updateScheduleStartEndSelect();
    }

    @Override
    public void undoTransaction() {
        data.removeSchedule(item);
        controller.handleRemoveCleanUp();
        data.updateScheduleStartEndSelect();
    }
    
    
    
    
}
