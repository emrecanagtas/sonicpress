
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  text: { fontSize: 12 },
});

export default function RiderPDF({ data }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>LDL TECHNICAL RIDER</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Artist Name: {data.artistName}</Text>
          <Text style={styles.text}>Venue: {data.venue}</Text>
          <Text style={styles.text}>Performance Date: {data.date}</Text>
          <Text style={styles.text}>Contact Email: {data.contactEmail}</Text>
        </View>
      </Page>
    </Document>
  );
}
