import {ActivityIndicator} from "react-native-paper";
import RelativeCenterLayout from "../../layouts/RelativeCenterLayout";
import * as React from "react";
import Colors from "../../constants/Colors";

const Loading = () =>
    <RelativeCenterLayout><ActivityIndicator size={32} color={Colors.light.tint}/></RelativeCenterLayout>

export default Loading;