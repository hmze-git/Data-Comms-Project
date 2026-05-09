import paho.mqtt.client as mqtt



def publish_noti(msg):
    try:
        client = mqtt.Client()
        client.connect("mosquitto",1883) #change on deply
        client.publish("notifications",msg)
        client.disconnect()
        
    except Exception as e:
        print(f"Mosquitto Failed: {e}")