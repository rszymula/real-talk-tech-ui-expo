import { View, Text, Image } from "react-native";
import { colors } from "../../context/themes";
import { Button, ButtonType } from "../core/Button";


export function ListItem(props){
  const {heading, subheading, body, buttonLabel, onPress, image, children} = props
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row', flex: 1, borderWidthX: 1, borderColorX: 'green'}}>
        <View style={{flexDirection: 'column'}}>
          {/* <Button
            title={""}
            onPress={() => {}}
            type={ButtonType.BASIC}
            styles={{height: 50, width: 100, border: 'none'}}
          /> */}
          <View>
            {/* <Image source={{uri: "https://vendor-logos-bucket.s3.amazonaws.com/vendor_logos_prod/sales-tools/outreach.png"}} style={{width: 32, height: 32}}/> */}
            <Image source={{uri: image}} style={{width: 128, height: 32}}/>
          </View>
          {buttonLabel && onPress && (<Button
            title={buttonLabel}
            onPress={onPress}
            type={ButtonType.BASIC}
            styles={{color: colors.textRegular, marginTop: 8}}
          />)}
        </View>
        <View style={{flexDirection: 'column', marginLeft: 16, flex: 1}}>
          <Text style={{color: colors.textHighlight}}>{heading}</Text>
          <Text style={{color: colors.textMid, marginTop: 4}}>{subheading}</Text>
          <Text style={{color: colors.textRegular, fontSize: 12, marginTop: 4}}>{body}</Text>
        </View>
      </View>
      <View style={{borderColorX: 'red', borderWidthX: 1}}>
        {children}
      </View>
    </View>
  )
}
