import React, {useEffect, useRef, useState} from "react";
import {Text, View} from 'react-native';
import {Camera, CameraCapturedPicture} from "expo-camera"

import styles from './styles';
import Toolbar from './toolbar.component';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {FridgeNaviParamList} from "../../types";

const CaptureItem = () => {

    const navigation = useNavigation<StackNavigationProp<FridgeNaviParamList, 'CaptureItems'>>();

    const [hasCameraPermission, setHasCameraPermission] = useState<Boolean | null>(null);
    const [cameraType, setCameraType] = useState<any>(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState();
    // const [captures, setCaptures] = useState();
    const [capturing, setCapturing] = useState<boolean | undefined>(undefined);

    const camera = useRef<any>(undefined); // TODO: change 'any' to other type

    useEffect(() => {
        console.log("[omtm]: set camera permission");
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const handleCaptureOut = () => {
        if (camera && capturing) camera.current!.stopRecording();
    };

    const handleShortCapture = async () => {
        const photoData: CameraCapturedPicture = await camera.current!.takePictureAsync({base64: true});
        setCapturing(false)
        navigation.navigate("AddItems", {
            itemPhoto: photoData
        })
    };

    if (hasCameraPermission === null) {
        return <View style={{display: "flex", alignItems: "center", justifyContent: "center"}}><Text>카메라 권한을 허가해주세요</Text></View>; // <View/>;
    } else if (!hasCameraPermission) {
        return <Text>Access to camera has been denied.</Text>;
    }
    return (
        <React.Fragment>
            <View style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
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


export default CaptureItem;