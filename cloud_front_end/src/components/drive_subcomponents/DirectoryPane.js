import React from "react";
import {DriveContext} from "../../common/GlobaContext";
import DirectoryPaneStyles from "../../styles/DirectoryPaneStyles";
import {withStyles} from "@material-ui/core";
import clsx from "clsx";
import FileCard from "./FileCard";
import {Grid} from "@material-ui/core";
import { SelectableGroup, createSelectable, } from 'react-selectable-fast';
import { SelectAll, DeselectAll } from 'react-selectable-fast'
import "../../styles/SelectableStyles.css";


// make filecard component selectable
const FileCardSelectable = createSelectable(FileCard);

class DirectoryPane extends React.Component{
    static contextType = DriveContext;


    constructor(props) {
        super(props);
        this.state = {

        }
        this.getContent = this.getContent.bind(this);
        this.handleSelectionFinish = this.handleSelectionFinish.bind(this);
    }

    getContent(){
        const {directoryPaneData, highlighted} = this.context;
        let result = directoryPaneData.map((element, index) => {
            let selected = highlighted.includes(element.filename);
            return(
                <Grid key={index} item={true}>
                    <FileCardSelectable key={element.filename} selected={selected} selectableKey={element.filename} data={element}/>
                </Grid>
                )
        });

        return result;
    }



    handleSelectionFinish (selectedKeys) {
        let {setHighlighted} = this.context;
        let newHighlighted = [];
        console.log(selectedKeys);
        selectedKeys.forEach((element, index)=>{
            newHighlighted.push(element.props.selectableKey);
        })
        setHighlighted(newHighlighted);
    }

    render() {
        const {classes} = this.props;
        const {open} = this.context;
        const content = this.getContent();
        return(
            <SelectableGroup
                enableDeselect
                // duringSelection={this.handleSelection}
                onSelectionFinish={this.handleSelectionFinish}
                preventDefault={true}
                allowClickWithoutSelected={false}
                enableDeselect
                resetOnStart={true}
                selectOnClick={false}
            >
                <main id={"directory content"}
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />

                        <Grid container={true} spacing={2} >
                            {/*<SelectAll className="selectable-button">*/}
                            {/*    <button>Select all</button>*/}
                            {/*</SelectAll>*/}
                            {/*<DeselectAll className="selectable-button">*/}
                            {/*    <button>Clear selection</button>*/}
                            {/*</DeselectAll>*/}
                            {content}
                        </Grid>

                </main>
            </SelectableGroup>
        )
    }

}

export default withStyles(DirectoryPaneStyles)(DirectoryPane);

