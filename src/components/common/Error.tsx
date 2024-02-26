import { ActivityIndicator, View, Text } from "react-native"
import { RButton, RButtonText } from "../core/RButton"
import { colors } from "../../context/themes"

export function Error({handleRetryPress = null, handleRestartPress = null}){
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{color: colors.error, fontSize: 14}}>{"Oops, we experienced an error on our end"}</Text>
      {handleRetryPress && <RButton onPress={handleRetryPress} active style={{marginTop: 16}}>
        <RButtonText active text={"Click here to Retry"}/>
      </RButton>}
      {handleRestartPress && <RButton onPress={handleRestartPress} active style={{marginTop: 16}}>
        <RButtonText active text={"Click here to start over again"}/>
      </RButton>}
    </View>
  )
}
