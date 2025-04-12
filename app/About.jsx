import { Text, View, StyleSheet } from 'react-native';
import Sidebar from "../components/Sidebar";

export default function About() {
  const teamMembers = [
    'Abdo yehia',
    'Mustafa Dolseka',
    'Mohamed',
    'Assem Mido',
    'Teto',
  ];

  return (
    <View style={styles.container}>
      <Sidebar />
      <View style={styles.content}>
        <Text style={styles.text}>About Page</Text>
        <View style={styles.teamMembers}>
          <Text style={styles.team}>This is our team that contains:</Text>
          <View style={styles.list}>
            {teamMembers.map((member, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.member}>{member}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row",backgroundColor: "#121212", },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"white",
  },
  team: {
    fontSize: 18,
    marginBottom: 5,
    color:"white",
  },
  member: {
    fontSize: 18,
    color:"white",
  },
  teamMembers: {
    marginTop: 20,
    alignItems: 'center',
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
    color:"white",
  },
  bullet: {
    fontSize: 20,
    marginRight: 5,
    marginTop: -3,
    color:"white",
  },
});
