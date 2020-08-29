import React, {useEffect, useRef, useState} from "react";
import {Text, View} from 'react-native';
import {Camera, CameraCapturedPicture} from "expo-camera"

import styles from './styles';
import Toolbar from './toolbar.component';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {TabOneParamList} from "../../types";

const CaptureItems = () => {

    const navigation = useNavigation<StackNavigationProp<TabOneParamList, 'CaptureItems'>>();

    const [hasCameraPermission, setHasCameraPermission] = useState<Boolean | null>(null);
    const [cameraType, setCameraType] = useState<any>(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState();
    // const [captures, setCaptures] = useState();
    const [capturing, setCapturing] = useState<boolean | undefined>(undefined);

    const camera = useRef<any>(undefined); // TODO: change 'any' to other type

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const handleCaptureOut = () => {
        if (camera && capturing) camera.current!.stopRecording();
    };

    const handleShortCapture = async () => {
        const photoData: CameraCapturedPicture = await camera.current!.takePictureAsync();
        setCapturing(false)
        navigation.navigate("AddItems", {
            itemPhoto: photoData
        })
    };

    if (hasCameraPermission === null) {
        return <View/>;
    } else if (!hasCameraPermission) {
        return <Text>Access to camera has been denied.</Text>;
    }
    return (
        <React.Fragment>
            <View>
                <Camera
                    type={cameraType}
                    flashMode={flashMode}
                    style={styles.preview}
                    ref={camera}
                />
            </View>

            {/* {captures.length > 0 && <Gallery captures={captures}/>} */}

            <Toolbar
                capturing={capturing}
                flashMode={flashMode}
                cameraType={cameraType}
                setFlashMode={setFlashMode}
                setCameraType={setCameraType}
                onCaptureIn={() => setCapturing(true)}
                onCaptureOut={handleCaptureOut}
                /* onLongCapture={this.handleLongCapture} */
                onShortCapture={handleShortCapture}
            />
        </React.Fragment>
    );

}


export default CaptureItems;