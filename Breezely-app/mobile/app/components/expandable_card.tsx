import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Enable smooth animations for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Added props so you can reuse this card with different text
interface ExpandableTaskCardProps {
  title: string;
  note: string;
  date: string;
}

export default function ExpandableTaskCard({ title, note, date }: ExpandableTaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.cardContainer}>
      {/* HEADER: Always visible */}
      <TouchableOpacity 
        style={styles.cardHeader} 
        onPress={toggleExpand} 
        activeOpacity={0.7}
      >
        <Text style={styles.taskTitle}>{title}</Text>
        <Ionicons 
          name={isExpanded ? "caret-up" : "caret-down"} 
          size={18} 
          color="black" 
        />
      </TouchableOpacity>

      {/* DETAILS: Only visible when expanded */}
      {isExpanded && (
        <View style={styles.cardDetails}>
          <Text style={styles.label}>Note :</Text>
          <Text style={styles.noteBody}>{note}</Text>

          <Text style={styles.label}>Files :</Text>
          <View style={styles.fileRow}>
            <View style={styles.filePill} />
            <View style={styles.filePill} />
          </View>
          <View style={[styles.filePill, { marginTop: 5 }]} />

          <View style={styles.dateRow}>
            <Text style={styles.label}>Date : </Text>
            <Text style={styles.dateValue}>{date}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
  },
  noteBody: {
    fontSize: 14,
    color: '#333',
    paddingLeft: 40, 
    lineHeight: 18,
  },
  fileRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  filePill: {
    height: 18,
    width: 70,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
  },
  dateRow: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  dateValue: {
    fontSize: 14,
  }
});