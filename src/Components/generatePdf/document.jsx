import React, { Component } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link
} from "@react-pdf/renderer";
import { getSavedLocs } from "../../utils/saveLocation";

// RenderRow

const RenderRow = ({ item1, item2 }) => {
  console.log("Inside renderRow: item: ", item1, item2);

  return (
    <View style={styles.rowCont} wrap={false}>
      {item1 && (
        <View style={styles.section}>
          <Image style={styles.image} src={item1.src} />
          <Link src={item1.locPermalink}>
            <Text style={styles.text}>{item1.locName}</Text>
          </Link>
        </View>
      )}

      {item2 && (
        <View style={styles.section}>
          <Image style={styles.image} src={item2.src} />
          <Link src={item2.locPermalink}>
            <Text style={styles.text}>{item2.locName}</Text>
          </Link>
        </View>
      )}
    </View>
  );
};

// Create Document Component

class PdfDocument extends Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
  }

  componentDidMount() {
    console.log("Inside PdfDocument componenet");
    const savedLocs = getSavedLocs() || [];
    this.setState({ savedLocs });

    console.log("SavedLocs In Document", savedLocs);
  }

  renderLocations() {
    console.log("Inside renderLocations");
    const { savedLocs: photos = [] } = this.state;

    const allPhotos = [];
    for (let i = 0; i < photos.length; i = i + 2) {
      // console.log(`Photo at index: ${i}`, photos[i]);
      // console.log("Next Photo:  ", photos[i + 1]);
      allPhotos.push(
        <RenderRow key={i} item1={photos[i]} item2={photos[i + 1]} />
      );
      // i = i + 2;
    }

    return allPhotos;
  }

  render() {
    const { savedLocs: photos } = this.state;
    console.log("Photos are: ", photos);

    //www.filmwithus.com/wp-content/uploads/2019/04/filmwithus-logo.png
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View style={styles.headerImgCont}>
              <Image
                style={styles.headerImg}
                src="https://www.filmwithus.com/wp-content/uploads/2019/04/filmwithuspdf-logo-final.png"
              />
            </View>

            <View style={styles.headerInfo}>
              <View style={styles.headerPhone}>
                <Image
                  src="https://www.filmwithus.com/wp-content/uploads/2019/04/phone2.png"
                  style={styles.icon}
                />
                <Text style={styles.headerInfoText}>(424) 603-2525</Text>
              </View>

              <View style={styles.headerEmail}>
                <Image
                  src="https://www.filmwithus.com/wp-content/uploads/2019/04/email.png"
                  style={[styles.icon, styles.emailIcon]}
                />
                <Text style={[styles.headerInfoText, styles.headerEmailText]}>
                  contact@filmwithus.com
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#000",
              margin: 2,
              marginBottom: 10
            }}
          />

          <View style={{ padding: 0, margin: 0 }}>
            <Text style={styles.quickNote}>
              Click on location name to open in browser
            </Text>
          </View>

          {this.renderLocations()}
        </Page>
      </Document>
    );
  }
}

export default PdfDocument;

// Create styles
const styles = StyleSheet.create({
  header: {
    margin: 5,
    padding: 5,
    maxHeight: 100,
    // backgroundColor: "red",
    flexDirection: "row",
    flex: 1,
    // backgroundColor: "blue",
    alignItems: "center"
  },

  headerImgCont: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "yellow"
  },
  headerImg: {
    width: 200
  },

  headerInfo: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    // backgroundColor: "green",
    minHeight: 95,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  icon: {
    width: 20,
    height: 20
  },

  headerInfoText: {
    fontSize: 15
  },

  headerEmailText: {
    marginTop: 3
  },

  headerPhone: {
    // backgroundColor: "red",
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  headerEmail: {
    // backgroundColor: "pink",
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },

  page: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  rowCont: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginBottom: 5,
    marginTop: 5,
    maxHeight: 250,
    minHeight: 250
    // backgroundColor: "red"
  },
  quickNote: {
    fontSize: 10,
    marginLeft: 5
  },

  section: {
    margin: 2,
    flex: 1,
    maxWidth: 290
    // backgroundColor: "red"
  },
  image: {
    width: "100%",
    maxWidth: 290,
    maxHeight: 230,
    minHeight: 200,
    height: "auto"
  },
  text: {
    color: "#d8ba72",
    paddingTop: 5,
    backgroundColor: "#000",
    marginTop: 0,
    textAlign: "center"
  }
});
