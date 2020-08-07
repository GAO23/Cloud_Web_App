/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.java_client;
import com.java_client.clickboard.GeneratorClickboard;
import com.java_client.workspace.GeneratorWorkSpace;
import libs.DesktopJavaFramework.AppTemplate;
import libs.DesktopJavaFramework.components.AppClipboardComponent;
import libs.DesktopJavaFramework.components.AppDataComponent;
import libs.DesktopJavaFramework.components.AppFileComponent;
import  libs.DesktopJavaFramework.components.AppWorkspaceComponent;
import com.java_client.data.GeneratorData;
import com.java_client.files.GeneratorFiles;

import java.util.Locale;
import static javafx.application.Application.launch;


/**
 *
 * @author xgao
 */
public class GeneratorApp extends AppTemplate{

    @Override
    public AppClipboardComponent buildClipboardComponent(AppTemplate app) {
        return new GeneratorClickboard(this);
    }

    @Override
    public AppDataComponent buildDataComponent(AppTemplate app) {
        return new GeneratorData(this);
    }

    @Override
    public AppFileComponent buildFileComponent() {
        return new GeneratorFiles(this);
    }

    @Override
    public AppWorkspaceComponent buildWorkspaceComponent(AppTemplate app) {
        return new GeneratorWorkSpace(this);
    }
    
     public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        launch(args);
    }
    
}
