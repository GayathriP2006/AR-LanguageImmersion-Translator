from flask import Flask, request, jsonify
from flask_cors import CORS
from deep_translator import GoogleTranslator

app = Flask(__name__)
CORS(app)

cultural_context = {
    "hello": "In Japan, bowing is a respectful greeting.",
    "thank you": "In India, saying Dhanyavaad shows politeness.",
    "goodbye": "In France, people often say Au revoir."
}

@app.route('/translate', methods=['POST'])
def translate_text():

    data = request.json

    text = data.get('text')
    target = data.get('target')

    translated = GoogleTranslator(
        source='auto',
        target=target
    ).translate(text)

    context = cultural_context.get(
        text.lower(),
        "No cultural tip available."
    )

    return jsonify({
        'translated_text': translated,
        'cultural_context': context
    })

@app.route('/gesture', methods=['POST'])
def gesture_translate():

    data = request.json

    gesture = data.get('gesture')

    gesture_map = {
        'thumbs_up': 'Good Job 👍',
        'wave': 'Hello 👋',
        'clap': 'Appreciation 👏'
    }

    return jsonify({
        'meaning': gesture_map.get(
            gesture,
            'Unknown Gesture'
        )
    })

if __name__ == '__main__':
    app.run(debug=True)
