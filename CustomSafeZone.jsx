/*
    Custom Safe Zone Overlay Panel for After Effects
    Install to: Scripts/ScriptUI Panels/ folder, restart AE, find under Window menu
*/

(function(thisObj) {
    
    function buildUI(thisObj) {
        var panel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Custom Safe Zone", undefined, {resizeable: true});
        
        panel.orientation = "column";
        panel.alignChildren = ["fill", "top"];
        panel.spacing = 6;
        panel.margins = 10;
        
        var selectedColor = [1, 0.3, 0.3];
        var presetColors = {
            "Red": [1, 0.3, 0.3],
            "Green": [0.3, 1, 0.3],
            "Cyan": [0.3, 1, 1],
            "Yellow": [1, 1, 0.3],
            "Magenta": [1, 0.3, 1],
            "White": [1, 1, 1]
        };
        
        var mainContainer = panel.add("group");
        mainContainer.orientation = "row";
        mainContainer.alignChildren = ["fill", "top"];
        mainContainer.spacing = 10;
        
        var leftCol = mainContainer.add("group");
        leftCol.orientation = "column";
        leftCol.alignChildren = ["fill", "top"];
        leftCol.spacing = 6;
        
        var presetGroup = leftCol.add("group");
        presetGroup.orientation = "row";
        presetGroup.alignChildren = ["left", "center"];
        presetGroup.add("statictext", undefined, "Preset:");
        var presetDropdown = presetGroup.add("dropdownlist", undefined, [
            "Custom", "Snapchat", "Instagram Reels", "TikTok", "YouTube Shorts", "Title Safe", "Action Safe"
        ]);
        presetDropdown.selection = 0;
        presetDropdown.preferredSize = [110, -1];
        
        var unitGroup = leftCol.add("group");
        unitGroup.orientation = "row";
        unitGroup.alignChildren = ["left", "center"];
        unitGroup.add("statictext", undefined, "Units:");
        var unitDropdown = unitGroup.add("dropdownlist", undefined, ["%", "px"]);
        unitDropdown.selection = 0;
        unitDropdown.preferredSize = [50, -1];
        
        var marginPanel = leftCol.add("panel", undefined, "Margins");
        marginPanel.orientation = "column";
        marginPanel.alignChildren = ["fill", "top"];
        marginPanel.spacing = 4;
        marginPanel.margins = [8, 12, 8, 8];
        
        var marginRow1 = marginPanel.add("group");
        marginRow1.orientation = "row";
        marginRow1.alignChildren = ["left", "center"];
        marginRow1.add("statictext", undefined, "Top:").preferredSize = [45, -1];
        var topInput = marginRow1.add("edittext", undefined, "10");
        topInput.preferredSize = [45, 22];
        marginRow1.add("statictext", undefined, "Bottom:").preferredSize = [50, -1];
        var bottomInput = marginRow1.add("edittext", undefined, "35");
        bottomInput.preferredSize = [45, 22];
        
        var marginRow2 = marginPanel.add("group");
        marginRow2.orientation = "row";
        marginRow2.alignChildren = ["left", "center"];
        marginRow2.add("statictext", undefined, "Left:").preferredSize = [45, -1];
        var leftInput = marginRow2.add("edittext", undefined, "6");
        leftInput.preferredSize = [45, 22];
        marginRow2.add("statictext", undefined, "Right:").preferredSize = [50, -1];
        var rightInput = marginRow2.add("edittext", undefined, "6");
        rightInput.preferredSize = [45, 22];
        
        var rightCol = mainContainer.add("group");
        rightCol.orientation = "column";
        rightCol.alignChildren = ["fill", "top"];
        rightCol.spacing = 6;
        
        var appearancePanel = rightCol.add("panel", undefined, "Appearance");
        appearancePanel.orientation = "column";
        appearancePanel.alignChildren = ["fill", "top"];
        appearancePanel.spacing = 4;
        appearancePanel.margins = [8, 12, 8, 8];
        
        var colorRow = appearancePanel.add("group");
        colorRow.orientation = "row";
        colorRow.alignChildren = ["left", "center"];
        colorRow.add("statictext", undefined, "Color:").preferredSize = [50, -1];
        var colorPresets = colorRow.add("dropdownlist", undefined, ["Red", "Green", "Cyan", "Yellow", "Magenta", "White"]);
        colorPresets.selection = 0;
        colorPresets.preferredSize = [90, -1];
        
        var strokeRow = appearancePanel.add("group");
        strokeRow.orientation = "row";
        strokeRow.alignChildren = ["left", "center"];
        strokeRow.add("statictext", undefined, "Stroke:").preferredSize = [50, -1];
        var thicknessInput = strokeRow.add("edittext", undefined, "2");
        thicknessInput.preferredSize = [40, 22];
        strokeRow.add("statictext", undefined, "px");
        
        var opacityRow = appearancePanel.add("group");
        opacityRow.orientation = "row";
        opacityRow.alignChildren = ["left", "center"];
        opacityRow.add("statictext", undefined, "Opacity:").preferredSize = [50, -1];
        var opacityInput = opacityRow.add("edittext", undefined, "80");
        opacityInput.preferredSize = [40, 22];
        opacityRow.add("statictext", undefined, "%");
        
        var fillCheckbox = appearancePanel.add("checkbox", undefined, "Fill unsafe areas");
        fillCheckbox.value = true;
        
        var layerPanel = rightCol.add("panel", undefined, "Layer");
        layerPanel.orientation = "column";
        layerPanel.alignChildren = ["fill", "top"];
        layerPanel.spacing = 4;
        layerPanel.margins = [8, 12, 8, 8];
        
        var nameRow = layerPanel.add("group");
        nameRow.orientation = "row";
        nameRow.alignChildren = ["left", "center"];
        nameRow.add("statictext", undefined, "Name:");
        var layerNameInput = nameRow.add("edittext", undefined, "Safe Zone Overlay");
        layerNameInput.preferredSize = [130, 22];
        
        var checkboxRow = layerPanel.add("group");
        checkboxRow.orientation = "row";
        checkboxRow.alignChildren = ["left", "center"];
        var guideCheckbox = checkboxRow.add("checkbox", undefined, "Guide Layer");
        guideCheckbox.value = true;
        var lockCheckbox = checkboxRow.add("checkbox", undefined, "Lock");
        lockCheckbox.value = false;
        
        var buttonGroup = panel.add("group");
        buttonGroup.orientation = "row";
        buttonGroup.alignChildren = ["center", "center"];
        buttonGroup.spacing = 6;
        
        var createBtn = buttonGroup.add("button", undefined, "Create");
        createBtn.preferredSize = [70, 26];
        var updateBtn = buttonGroup.add("button", undefined, "Update");
        updateBtn.preferredSize = [70, 26];
        var deleteBtn = buttonGroup.add("button", undefined, "Delete");
        deleteBtn.preferredSize = [70, 26];
        
        var statusText = panel.add("statictext", undefined, "Ready");
        statusText.alignment = ["fill", "bottom"];
        
        var MIN_WIDTH_FOR_COLUMNS = 420;
        
        function updateLayout() {
            var w = panel.size ? panel.size[0] : 450;
            if (w < MIN_WIDTH_FOR_COLUMNS) {
                mainContainer.orientation = "column";
                leftCol.alignment = ["fill", "top"];
                rightCol.alignment = ["fill", "top"];
            } else {
                mainContainer.orientation = "row";
                leftCol.alignment = ["left", "top"];
                rightCol.alignment = ["left", "top"];
            }
            panel.layout.layout(true);
        }
        
        colorPresets.onChange = function() {
            if (colorPresets.selection) {
                selectedColor = presetColors[colorPresets.selection.text];
            }
        };
        
        presetDropdown.onChange = function() {
            var idx = presetDropdown.selection.index;
            unitDropdown.selection = 0;
            var presets = [
                null,
                {t: 10, b: 35, l: 6, r: 6},
                {t: 5, b: 5, l: 5, r: 5},
                {t: 10, b: 35, l: 3, r: 3},
                {t: 5, b: 20, l: 5, r: 5},
                {t: 10, b: 10, l: 10, r: 10},
                {t: 5, b: 5, l: 5, r: 5}
            ];
            if (presets[idx]) {
                topInput.text = presets[idx].t;
                bottomInput.text = presets[idx].b;
                leftInput.text = presets[idx].l;
                rightInput.text = presets[idx].r;
            }
        };
        
        createBtn.onClick = function() { createSafeZoneOverlay(false); };
        updateBtn.onClick = function() { createSafeZoneOverlay(true); };
        deleteBtn.onClick = deleteSafeZoneLayer;
        
        function getMarginValues() {
            return {
                top: parseFloat(topInput.text) || 0,
                bottom: parseFloat(bottomInput.text) || 0,
                left: parseFloat(leftInput.text) || 0,
                right: parseFloat(rightInput.text) || 0,
                usePercentage: (unitDropdown.selection.index === 0)
            };
        }
        
        function createSafeZoneOverlay(updateExisting) {
            var comp = app.project.activeItem;
            if (!comp || !(comp instanceof CompItem)) {
                statusText.text = "Error: No active composition";
                return;
            }
            
            var margins = getMarginValues();
            var compWidth = comp.width;
            var compHeight = comp.height;
            
            var topPx, bottomPx, leftPx, rightPx;
            if (margins.usePercentage) {
                topPx = (margins.top / 100) * compHeight;
                bottomPx = (margins.bottom / 100) * compHeight;
                leftPx = (margins.left / 100) * compWidth;
                rightPx = (margins.right / 100) * compWidth;
            } else {
                topPx = margins.top;
                bottomPx = margins.bottom;
                leftPx = margins.left;
                rightPx = margins.right;
            }
            
            if (leftPx + rightPx >= compWidth || topPx + bottomPx >= compHeight) {
                statusText.text = "Error: Margins too large";
                return;
            }
            
            app.beginUndoGroup("Create Safe Zone Overlay");
            
            try {
                var layerName = layerNameInput.text || "Safe Zone Overlay";
                var shapeLayer;
                
                if (updateExisting) {
                    for (var i = 1; i <= comp.numLayers; i++) {
                        if (comp.layer(i).name === layerName) {
                            shapeLayer = comp.layer(i);
                            shapeLayer.locked = false;
                            while (shapeLayer.property("Contents").numProperties > 0) {
                                shapeLayer.property("Contents").property(1).remove();
                            }
                            break;
                        }
                    }
                }
                
                if (!shapeLayer) {
                    shapeLayer = comp.layers.addShape();
                    shapeLayer.name = layerName;
                }
                
                var contents = shapeLayer.property("Contents");
                var strokeWidth = parseFloat(thicknessInput.text) || 2;
                var opacity = parseFloat(opacityInput.text) || 80;
                var useFill = fillCheckbox.value;
                
                var safeLeft = leftPx;
                var safeTop = topPx;
                var safeRight = compWidth - rightPx;
                var safeBottom = compHeight - bottomPx;
                var safeWidth = safeRight - safeLeft;
                var safeHeight = safeBottom - safeTop;
                var offsetX = (safeLeft + safeWidth / 2) - compWidth / 2;
                var offsetY = (safeTop + safeHeight / 2) - compHeight / 2;
                
                if (useFill) {
                    var fillAreas = [
                        {name: "Top", w: compWidth, h: topPx, x: 0, y: -compHeight/2 + topPx/2, show: topPx > 0},
                        {name: "Bottom", w: compWidth, h: bottomPx, x: 0, y: compHeight/2 - bottomPx/2, show: bottomPx > 0},
                        {name: "Left", w: leftPx, h: safeHeight, x: -compWidth/2 + leftPx/2, y: offsetY, show: leftPx > 0},
                        {name: "Right", w: rightPx, h: safeHeight, x: compWidth/2 - rightPx/2, y: offsetY, show: rightPx > 0}
                    ];
                    
                    for (var f = 0; f < fillAreas.length; f++) {
                        var area = fillAreas[f];
                        if (area.show) {
                            var grp = contents.addProperty("ADBE Vector Group");
                            grp.name = area.name;
                            var rect = grp.property("Contents").addProperty("ADBE Vector Shape - Rect");
                            rect.property("Size").setValue([area.w, area.h]);
                            rect.property("Position").setValue([area.x, area.y]);
                            var fill = grp.property("Contents").addProperty("ADBE Vector Graphic - Fill");
                            fill.property("Color").setValue(selectedColor);
                            fill.property("Opacity").setValue(opacity * 0.5);
                        }
                    }
                }
                
                var borderGroup = contents.addProperty("ADBE Vector Group");
                borderGroup.name = "Border";
                var borderRect = borderGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
                borderRect.property("Size").setValue([safeWidth, safeHeight]);
                borderRect.property("Position").setValue([offsetX, offsetY]);
                var borderStroke = borderGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
                borderStroke.property("Color").setValue(selectedColor);
                borderStroke.property("Stroke Width").setValue(strokeWidth);
                borderStroke.property("Opacity").setValue(opacity);
                
                var markerSize = Math.min(Math.max(Math.min(safeWidth, safeHeight) * 0.05, 20), 50);
                var corners = [
                    {x: safeLeft, y: safeTop, dx: 1, dy: 1},
                    {x: safeRight, y: safeTop, dx: -1, dy: 1},
                    {x: safeLeft, y: safeBottom, dx: 1, dy: -1},
                    {x: safeRight, y: safeBottom, dx: -1, dy: -1}
                ];
                
                for (var c = 0; c < corners.length; c++) {
                    var corner = corners[c];
                    var cx = corner.x - compWidth / 2;
                    var cy = corner.y - compHeight / 2;
                    var cornerGroup = contents.addProperty("ADBE Vector Group");
                    cornerGroup.name = "Corner" + c;
                    var cornerPath = cornerGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
                    var pathData = new Shape();
                    pathData.vertices = [[cx, cy + corner.dy * markerSize], [cx, cy], [cx + corner.dx * markerSize, cy]];
                    pathData.closed = false;
                    cornerPath.property("Path").setValue(pathData);
                    var cornerStroke = cornerGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
                    cornerStroke.property("Color").setValue(selectedColor);
                    cornerStroke.property("Stroke Width").setValue(strokeWidth * 1.5);
                    cornerStroke.property("Opacity").setValue(opacity);
                }
                
                var crossSize = Math.min(Math.max(Math.min(safeWidth, safeHeight) * 0.03, 15), 30);
                var crossGroup = contents.addProperty("ADBE Vector Group");
                crossGroup.name = "Center";
                var hLine = crossGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
                var hPath = new Shape();
                hPath.vertices = [[offsetX - crossSize, offsetY], [offsetX + crossSize, offsetY]];
                hPath.closed = false;
                hLine.property("Path").setValue(hPath);
                var vLine = crossGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
                var vPath = new Shape();
                vPath.vertices = [[offsetX, offsetY - crossSize], [offsetX, offsetY + crossSize]];
                vPath.closed = false;
                vLine.property("Path").setValue(vPath);
                var crossStroke = crossGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
                crossStroke.property("Color").setValue(selectedColor);
                crossStroke.property("Stroke Width").setValue(strokeWidth);
                crossStroke.property("Opacity").setValue(opacity * 0.7);
                
                shapeLayer.moveToBeginning();
                shapeLayer.startTime = 0;
                shapeLayer.outPoint = comp.duration;
                
                var unit = margins.usePercentage ? "%" : "px";
                var infoText = "T:" + margins.top + unit + " B:" + margins.bottom + unit + " L:" + margins.left + unit + " R:" + margins.right + unit;
                shapeLayer.comment = infoText;
                
                if (guideCheckbox.value) shapeLayer.guideLayer = true;
                if (lockCheckbox.value) shapeLayer.locked = true;
                statusText.text = "Created: " + infoText;
                
            } catch (e) {
                statusText.text = "Error: " + e.toString();
            }
            
            app.endUndoGroup();
        }
        
        function deleteSafeZoneLayer() {
            var comp = app.project.activeItem;
            if (!comp || !(comp instanceof CompItem)) {
                statusText.text = "Error: No active composition";
                return;
            }
            
            var layerName = layerNameInput.text || "Safe Zone Overlay";
            app.beginUndoGroup("Delete Safe Zone Layer");
            
            for (var i = comp.numLayers; i >= 1; i--) {
                if (comp.layer(i).name === layerName) {
                    comp.layer(i).locked = false;
                    comp.layer(i).remove();
                    statusText.text = "Deleted: " + layerName;
                    app.endUndoGroup();
                    return;
                }
            }
            statusText.text = "Not found: " + layerName;
            app.endUndoGroup();
        }
        
        panel.layout.layout(true);
        panel.onResizing = panel.onResize = function() {
            this.layout.resize();
            updateLayout();
        };
        
        if (panel instanceof Window) {
            panel.center();
            panel.show();
        }
        
        updateLayout();
        return panel;
    }
    
    buildUI(thisObj);
    
})(this);