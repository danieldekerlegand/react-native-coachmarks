import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, Image, LayoutAnimation, TouchableOpacity,Button } from 'react-native';
import Orientation from 'react-native-orientation-locker';

export default class TurtorialStep extends Component {
  static propTypes = {
    step: PropTypes.number,
    tooltip: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.object,
    position: PropTypes.object,
    tooltipPosition: PropTypes.object,
    onPress: PropTypes.func,
    okEnable: PropTypes.bool,
    onPressMark: PropTypes.func,
    endModal: PropTypes.bool,
    isCircleMask: PropTypes.bool,
    imagePosition: PropTypes.object,
    imageSource: PropTypes.number,
    okButtonPosition: PropTypes.object
  };

  static defaultProps = {
    okEnable: true,
    endModal: false,
    isCircleMask: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0
    };
  }

  componentDidMount() {
    const { width, height } = Dimensions.get('window');
    this.setState({ height, width });

    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);
  }

  _onOrientationDidChange = (orientation) => {
    const { width, height } = Dimensions.get('window');
		this.setState({ height, width });
	};

  render() {
    const height = this.state.height;
    const width = this.state.width;

    console.log("tutorialStep height", height);
    console.log("tutorialStep width", width);

    const {
      tooltip, visible, position, tooltipPosition, okEnable, onPressMark, endModal, isCircleMask, imagePosition, imageSource, okButtonPosition
    } = this.props;

    const firstOverlayWidth = position.left;
    const firstOverlayHeight = height;
    const firstOverlayX = 0;
    const firstOverlayY = 0;

    const secondOverlayWidth = this.props.style.width;
    const secondOverlayHeight = position.top;
    const secondOverlayX = position.left;
    const secondOverlayY = 0;

    const thirdOverlayWidth = width - position.left - this.props.style.width;
    const thirdOverlayHeight = height;
    const thirdOverlayX = position.left + this.props.style.width;
    const thirdOverlayY = 0;

    const fourthOverlayWidth = this.props.style.width;
    const fourthOverlayHeight = height - position.top - this.props.style.height;
    const fourthOverlayX = position.left;
    const fourthOverlayY = position.top + this.props.style.height;
    const lineLogoImg = require('../mask.png');

    return (
      visible &&
        <View style={{
          width,
          height,
          top: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0)',
        }}>
          <View style={[styles.overlay,
            {
              left: firstOverlayX,
              top: firstOverlayY,
              width: firstOverlayWidth,
              height: firstOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: secondOverlayX,
              top: secondOverlayY,
              width: secondOverlayWidth,
              height: secondOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: thirdOverlayX,
              top: thirdOverlayY,
              width: thirdOverlayWidth,
              height: thirdOverlayHeight,
            }]}
          />
          <View style={[styles.overlay,
            {
              left: fourthOverlayX,
              top: fourthOverlayY,
              width: fourthOverlayWidth,
              height: fourthOverlayHeight,
            }]}
          />
          {!endModal &&
          <View>
            <View style={[styles.tooltip, tooltipPosition]}>
              <Text style={styles.tooltipText}>{tooltip}</Text>
              <View style={[styles.okButton, okButtonPosition]}>
                  {okEnable && <Button title="OK" onPress={() => this.OKButton()} />}
              </View>
            </View>
            <View style={[styles.image, imagePosition]}>
              <Image 
                    source={imageSource} 
                    style={styles.image}
                    />
            </View>
          </View>
          }
          {okEnable &&
            <View style={[{ width: this.props.style.width, height: this.props.style.height }, this.props.position]}>
              <View style={[this.props.style, styles.coachMarks]} />
            </View>
          }
          {!okEnable &&
            <View style={[{ width: this.props.style.width, height: this.props.style.height }, this.props.position]}>
              {isCircleMask &&
              <Image
                source={lineLogoImg}
                resizeMode="stretch"
                style={{
                flex: 1,
                width: null,
                height: null,
            }}
              />
            }
              <View style={[this.props.style, styles.coachMarks]}>
                <TouchableOpacity
                  onPress={() => {
                  this.OKButton();
                  onPressMark();
                }}
                  style={{ width: this.props.style.width, height: this.props.style.height }}
                  activeOpacity={0.8}
                />
              </View>
            </View>
          }
        </View>
    );
  }

  OKButton() {
    LayoutAnimation.easeInEaseOut();
    this.props.onPress(this.props.step);
  }
}

const styles =  StyleSheet.create({
  coachMarks: {
    position: 'absolute'  
  },
  tooltip: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(216, 213, 212, 0.8)',
    overflow: 'hidden',
    position: 'absolute',
    alignSelf: 'center',
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  image: {
    flex: 1,
    width: 115,
    resizeMode: 'contain'
  },
  tooltipText: {
    color: '#f9a847',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 15,
  },
  okButton: {
    backgroundColor: 'white', 
    borderRadius: 5    
  },
  bgContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: 150,
  },
  buttonText: {
    color: 'rgba(70, 165, 135, 1)',
  },
  dogImage: {
    marginVertical: 16,
    marginTop: 15,
    marginBottom: 10,
    width: 124,
    height: 124,
  },
  centeringTxt: {
    color: 'rgba(0, 0, 0, 0.87)',
    textAlign: 'center',
    paddingLeft: 3,
    paddingRight: 3,
  },
  skip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
  },
});
