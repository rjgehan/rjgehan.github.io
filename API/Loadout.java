public class Loadout {
    String primary;
    String energy;
    String heavy;
    int dps;
    String name;

    Loadout(String primary, String energy, String heavy, String name) {
        this.primary = primary;
        this.energy = energy;
        this.heavy = heavy;
        this.name = name;
        this.dps = getDPS(primary, energy, heavy);
    }

    public int getDPS(String primary, String energy, String heavy) {
        // Weapons[ammotype][four letter abrev for guntype][frame/exotic name]
        int newDPS = 1;
        return newDPS;
    }
}
