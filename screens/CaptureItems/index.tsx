import React, { Component, useEffect, useState, useRef } from "react";
import { View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera, CameraCapturedPicture } from "expo-camera"

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import { useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {TabOneParamList} from "../../types";

const CaptureItems = () => {

    const navigation = useNavigation<StackNavigationProp<TabOneParamList, 'AddItems'>>();

    const [hasCameraPermission, setHasCameraPermission] = useState<Boolean | null>(null);
    const [cameraType, setCameraType] = useState<any>(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState();
    // const [captures, setCaptures] = useState();
    const [capturing, setCapturing] = useState<boolean | undefined>(undefined);

    const camera = useRef<any>(undefined); // TODO: change 'any' to other type

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
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
        return <View />;
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
                onCaptureIn={setCapturing(true)}
                onCaptureOut={handleCaptureOut}
                /* onLongCapture={this.handleLongCapture} */
                onShortCapture={handleShortCapture}
            />
        </React.Fragment>
    );
}

//
//
// class CaptureItems extends Component<Props, State> {
//     constructor(props) {
//         super(props);
//     }
//
//
//     camera = null;
//
//     state = {
//         captures: [],
//         capturing: null,
//         hasCameraPermission: null,
//         cameraType: Camera.Constants.Type.back,
//         flashMode: Camera.Constants.FlashMode.off,
//     };
//
//     setFlashMode = (flashMode) => this.setState({ flashMode });
//     setCameraType = (cameraType) => this.setState({ cameraType });
//     handleCaptureIn = () => this.setState({ capturing: true });
//
//     handleCaptureOut = () => {
//         if (this.state.capturing)
//             this.camera.stopRecording();
//     };
//
//     handleShortCapture = async () => {
//         const photoData = await this.camera.takePictureAsync();
//         this.props.newItem.uri = photoData.uri
//         this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
//         this.props.navigation.navigate("AddItems", {
//             photoItem: photoData
//         })
//     };
//
//     /* handleLongCapture = async () => {
//         const videoData = await this.camera.recordAsync();
//         this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
//     }; */
//
//     async componentDidMount() {
//         const camera = await Permissions.askAsync(Permissions.CAMERA);
//         const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
//         const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
//
//         this.setState({ hasCameraPermission });
//     };
//
//     render() {
//         const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
//
//         if (hasCameraPermission === null) {
//             return <View />;
//         } else if (hasCameraPermission === false) {
//             return <Text>Access to camera has been denied.</Text>;
//         }
//
//         return (
//             <React.Fragment>
//                 <View>
//                     <Camera
//                         type={cameraType}
//                         flashMode={flashMode}
//                         style={styles.preview}
//                         ref={camera => this.camera = camera}
//                     />
//                 </View>
//
//                 {/* {captures.length > 0 && <Gallery captures={captures}/>} */}
//
//                 <Toolbar
//                     capturing={capturing}
//                     flashMode={flashMode}
//                     cameraType={cameraType}
//                     setFlashMode={this.setFlashMode}
//                     setCameraType={this.setCameraType}
//                     onCaptureIn={this.handleCaptureIn}
//                     onCaptureOut={this.handleCaptureOut}
//                     /* onLongCapture={this.handleLongCapture} */
//                     onShortCapture={this.handleShortCapture}
//                 />
//             </React.Fragment>
//         );
//     };
// };

export default CaptureItems;