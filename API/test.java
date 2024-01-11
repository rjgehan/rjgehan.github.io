import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;



public class test {
    public static void main(String[] args) {
        try {
            String apiKey = "6467501de168494c97c7a9b00aa2653e"; // Replace with your API key
            URL url = new URL("https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/4255171531/\r\n" + //
                    "");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("X-API-Key", apiKey);

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            conn.disconnect();

            FileWriter fileWriter = new FileWriter("destiny2_manifest.json");
            fileWriter.write(content.toString());
            fileWriter.close();
            System.out.println("Manifest saved to destiny2_manifest.json");

            // System.out.println(content[response]);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
