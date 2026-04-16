public class BurnoutCalculator {

    public static int calculateScore(Entry entry) {
        int score = 0;

        if (entry.getSleepHours() < 6) {
            score += 2;
        }

        if (entry.getStressLevel() > 7) {
            score += 2;
        }

        if (entry.getStudyHours() > 8) {
            score += 1;
        }

        if (entry.getMoodScore() < 4) {
            score += 2;
        }

        return score;
    }

    public static String getRiskLevel(int score) {
        if (score <= 2) {
            return "Low Risk";
        } else if (score <= 5) {
            return "Moderate Risk";
        } else {
            return "High Risk";
        }
    }

    public static String getRecommendation(int score) {
        if (score <= 2) {
            return "Your current habits suggest a lower burnout risk. Keep maintaining a healthy routine.";
        } else if (score <= 5) {
            return "Your results show some signs of burnout. Consider improving sleep and balancing your workload.";
        } else {
            return "Your results suggest a high burnout risk. Try to reduce stress, get more rest, and seek support if needed.";
        }
    }
}
