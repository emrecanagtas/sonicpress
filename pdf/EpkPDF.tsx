import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 5 },
  body: { fontSize: 12 },
});

export default function EpkPDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Artist Bio</Text>
          <Text style={styles.body}>{data.bio}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Press Blurb</Text>
          <Text style={styles.body}>{data.blurb}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Tags</Text>
          <Text style={styles.body}>{data.tags}</Text>
        </View>
      </Page>
    </Document>
  );
}
