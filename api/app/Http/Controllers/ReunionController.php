<?php

namespace App\Http\Controllers;

use App\Reunion;
use App\ReunionTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class ReunionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return json_encode(Reunion::where("DATE(date)", "=", "DATE(NOW())")->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll($locale) {

        $reunions  = Reunion::select(DB::raw('reunions.*, DATE_FORMAT(reunions.date,\'%Y%m%d\') as datePath, DATE_FORMAT(reunions.date,\'%Y-%m-%d\') as day, DATE_FORMAT(reunions.date,\'%H:%i\') as  time'))
            ->where([['date', '>=', date('Y-m-d', strtotime('-1 DAY'))], ['date', '<=', date('Y-m-d', strtotime('+2 DAY'))]])
            ->whereHas('races')
            ->with('translation')
            ->get();

        if(empty($reunions)) {
            return response()->json(array(
                'reunions'=>[],
                'error'=>'No data'
            ));
        }

        return response()->json(['reunions'=>$reunions]);
    }

    public function getByDate($locale, $date) {

        $reunions  = Reunion::select(DB::raw('reunions.*, DATE_FORMAT(reunions.date,\'%Y%m%d\') as datePath, DATE_FORMAT(reunions.date,\'%Y-%m-%d\') as day, DATE_FORMAT(reunions.date,\'%H:%i\') as  time'))
            ->where([['date', '>=', date('Y-m-d', strtotime($date))], ['date', '<', date('Y-m-d', strtotime($date.' +1 DAY'))]])
            ->whereHas('races')
            ->with('translation')
            ->get();

        if(empty($reunions)) {
            return response()->json(array(
                'reunions'=>[],
                'error'=>'No data'
            ));
        }

        return response()->json(['reunions'=>$reunions]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        exit("qaqqaqaqa");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function show(Reunion $reunion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Reunion  $id
     * @param  String  $lang
     * @return \Illuminate\Http\Response
     */
    public function edit($id, $lang = 'hy')
    {
        $reunion = ReunionTranslation::where('reunionId', $id)->where('lang', $lang)->first();

        if ($reunion == null) {
            $reunion = Reunion::find($id);
        }
        $reunion->id = $id;
        $reunion->lang = $lang;

        return view('reunion.edit', [
            "reunion" => $reunion,
            "previousPage" => route('racesList').'/?page=' . Session::get('currentPage', 1)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Integer $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $label = $request->input('label');
        $statusLabel = $request->input('statusLabel');
        $hippodromeName = $request->input('hippodromeName');
        $speciality = $request->input('speciality');
        $lang = $request->input('lang');
        if ($label == '' || $lang == '') {
            return Redirect::back()->withErrors(['Fill required fields']);
        }
        $reunionTranslation = ReunionTranslation::firstOrNew(['reunionId' => $id, 'lang' => $lang]);
        $reunionTranslation->label = $label;
        $reunionTranslation->statusLabel = $statusLabel;
        $reunionTranslation->hippodromeName = $hippodromeName;
        $reunionTranslation->speciality = $speciality;
        $reunionTranslation->lang = $lang;

        $reunionTranslation->save();

        Session::flash('msg', "Successfully saved");

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Reunion  $reunion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reunion $reunion)
    {
        //
    }
}
