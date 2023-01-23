<?php

namespace App\Http\Controllers\Api;

use App\Models\Note;
use App\Models\Image;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\NoteCollection;
use App\Http\Requests\StoreOrUpdateNoteRequest;

class NotesController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Note::class, 'note');
    }

    /**
     * Display user notes list
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new NoteCollection(Note::with('image')->where('user_id', Auth::user()->id)->get());
    }

    /**
    * Store a newly created note.
    *
    * @param StoreNoteRequest $request
    * @return \Illuminate\Http\Response
    */
    public function store(StoreOrUpdateNoteRequest $request)
    {
        $noteData = $request->all();
        $noteData['user_id'] = Auth::user()->id;
        
        $note = Note::create($noteData);

        if ($request->file('image')) {
            $uploadedImage = $request->file('image');
            $fileName = Str::uuid();
            Image::create([
                'file'      => $fileName,
                'mime_type' => $uploadedImage->getClientMimeType(),
                'note_id'   => $note->id
            ]);
            $uploadedImage->storeAs(Image::NOTE_IMAGES_DIR, $fileName);
        }

        return new NoteResource($note);
    }

    /**
     * Display the specified note.
     *
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show(Note $note)
    {
        return new NoteResource($note);
    }

    /**
     * Update the specified note.
     *
     * @param  StoreOrUpdateNoteRequest  $request
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(StoreOrUpdateNoteRequest $request, Note $note)
    {
        $note->update($request->all());
    }

    /**
     * Remove the specified note.
     *
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        $note->delete();
    }
}
